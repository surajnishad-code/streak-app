import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LogoScreen from './components/LogoScreen.jsx';
import StreakDisplay from './components/StreakDisplay.jsx';
import DurationSelector from './components/DurationSelector.jsx';
import Timer from './components/Timer.jsx';
import PromptPanel from './components/PromptPanel.jsx';
import ConfettiEffect from './components/ConfettiEffect.jsx';
import CompletionModal from './components/CompletionModal.jsx';
import Achievements from './components/Achievements.jsx';
import AchievementToast from './components/AchievementToast.jsx';
import StartButton from './components/StartButton.jsx';
import {
  createInitialAchievements,
  evaluateAchievements,
} from './achievements/achievementsLogic.js';

const STORAGE_KEY = 'speakingStreak';

const getTodayString = () => new Date().toISOString().slice(0, 10);

const diffInDays = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const utcFrom = Date.UTC(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate(),
  );
  const utcTo = Date.UTC(
    toDate.getFullYear(),
    toDate.getMonth(),
    toDate.getDate(),
  );
  return Math.floor((utcTo - utcFrom) / (1000 * 60 * 60 * 24));
};

const App = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [streak, setStreak] = useState(0);
  const [lifetimeMinutes, setLifetimeMinutes] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(20 * 60);
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [recordingsCount, setRecordingsCount] = useState(0);
  const [achievements, setAchievements] = useState(
    () => createInitialAchievements(),
  );
  const [recentUnlocked, setRecentUnlocked] = useState(null);

  // Splash logo timing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setCanInstall(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw);
      const today = getTodayString();

      let nextStreak = Number(data.streak) || 0;
      const storedDate = data.lastCompletedDate || null;

      if (storedDate) {
        const diff = diffInDays(storedDate, today);
        if (diff === 0) {
          // streak stays
        } else if (diff === 1) {
          // streak continues
        } else if (diff > 1) {
          nextStreak = 0;
        }
      } else {
        nextStreak = 0;
      }

      setStreak(nextStreak);
      setLifetimeMinutes(Number(data.lifetimeMinutes) || 0);
      const initialGoal =
        data.dailyGoal === 40 || data.dailyGoal === 60 ? data.dailyGoal : 20;
      setDailyGoal(initialGoal);
      setLastCompletedDate(storedDate);
      setRemainingSeconds(initialGoal * 60);
      setRecordingsCount(Number(data.recordingsCount) || 0);
      if (Array.isArray(data.achievements)) {
        setAchievements(createInitialAchievements(data.achievements));
      }
    } catch (e) {
      console.error('Failed to load streak data', e);
    }
  }, []);

  // Warn user that active timer will reset on reload/close
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isRunning || isPaused) {
        const message =
          'Your speaking timer will reset if you leave or reload this page.';
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
      return undefined;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isRunning, isPaused]);

  const persist = useCallback(
    (nextState) => {
      const payload = {
        streak,
        lastCompletedDate,
        lifetimeMinutes,
        dailyGoal,
        recordingsCount,
        achievements,
        ...nextState,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    [achievements, dailyGoal, lastCompletedDate, lifetimeMinutes, recordingsCount, streak],
  );

  const handleSelectGoal = (minutes) => {
    setDailyGoal(minutes);
    if (!isRunning && !isPaused) {
      setRemainingSeconds(minutes * 60);
    }
    persist({ dailyGoal: minutes });
  };

  const completeSession = useCallback(() => {
    const today = getTodayString();
    const nextStreak = streak + 1;
    const nextLifetime = lifetimeMinutes + dailyGoal;
    const nextRecordings = recordingsCount + 1;

    const { nextAchievements, newlyUnlocked } = evaluateAchievements({
      streak: nextStreak,
      lifetimeMinutes: nextLifetime,
      recordingsCount: nextRecordings,
      currentAchievements: achievements,
      todayIso: today,
    });

    setIsRunning(false);
    setIsPaused(false);
    setRemainingSeconds(dailyGoal * 60);
    setStreak(nextStreak);
    setLifetimeMinutes(nextLifetime);
    setLastCompletedDate(today);
    setRecordingsCount(nextRecordings);
    setAchievements(nextAchievements);
    persist({
      streak: nextStreak,
      lifetimeMinutes: nextLifetime,
      lastCompletedDate: today,
      recordingsCount: nextRecordings,
      achievements: nextAchievements,
    });
    setConfettiKey((k) => k + 1);
    setCompletionModalOpen(true);
    if (newlyUnlocked.length > 0) {
      setRecentUnlocked(newlyUnlocked[0]);
    }
  }, [
    achievements,
    dailyGoal,
    lifetimeMinutes,
    persist,
    recordingsCount,
    streak,
  ]);

  const startSession = () => {
    if (isRunning) return;
    // Fresh start: reset timer to full goal
    if (!isPaused) {
      setRemainingSeconds(dailyGoal * 60);
    }
    setIsPaused(false);
    setIsRunning(true);
  };

  const pauseSession = () => {
    if (!isRunning) return;
    setIsRunning(false);
    setIsPaused(true);
  };

  const resumeSession = () => {
    if (isRunning || !isPaused) return;
    setIsRunning(true);
  };

  // Countdown effect managed at app level
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, completeSession]);

  const todayString = useMemo(() => getTodayString(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blackBg via-[#050308] to-blackBg text-antiqueWhite flex flex-col">
      {showLogo && <LogoScreen />}
      <ConfettiEffect triggerKey={confettiKey} />
      <CompletionModal
        isOpen={completionModalOpen}
        streak={streak}
        onClose={() => setCompletionModalOpen(false)}
      />
      <AchievementToast
        achievement={recentUnlocked}
        onClose={() => setRecentUnlocked(null)}
      />

      <header className="w-full max-w-3xl mx-auto px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-purplePrimary/20 border border-purplePrimary/60 flex items-center justify-center text-lg">
            🔊
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-antiqueWhite/60">
              Speaking
            </div>
            <div className="text-sm font-semibold tracking-wide">Streak</div>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs text-antiqueWhite/60">
          <span>Today</span>
          <span className="font-mono text-antiqueWhite/80">{todayString}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-5 pb-4">
        <section className="relative w-full max-w-3xl flex-1 flex flex-col items-center justify-center py-2">
          <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(123,44,191,0.25),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(250,235,215,0.08),_transparent_55%)]" />
          <div className="w-full max-w-2xl mx-auto rounded-3xl border border-antiqueWhite/10 bg-blackBg/70 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] px-4 py-5 md:px-7 md:py-7 space-y-4 md:space-y-6">
            <StreakDisplay streak={streak} lifetimeMinutes={lifetimeMinutes} />
            <DurationSelector selected={dailyGoal} onSelect={handleSelectGoal} />
            <Timer remainingSeconds={remainingSeconds} />
            <PromptPanel />
            <Achievements achievements={achievements} />
            <StartButton
              isRunning={isRunning}
              isPaused={isPaused}
              onStart={startSession}
              onPause={pauseSession}
              onResume={resumeSession}
            />
          </div>
        </section>

        <footer className="w-full max-w-3xl mx-auto px-5 text-[0.7rem] md:text-xs text-antiqueWhite/40 flex items-center justify-between gap-3 pt-4">
          <span>Keep your streak alive.</span>
          <div className="flex items-center gap-3">
            {canInstall && (
              <button
                type="button"
                onClick={async () => {
                  if (!deferredPrompt) return;
                  deferredPrompt.prompt();
                  const { outcome } = await deferredPrompt.userChoice;
                  if (outcome === 'accepted') {
                    setCanInstall(false);
                    setDeferredPrompt(null);
                  }
                }}
                className="rounded-full border border-purplePrimary/70 bg-purplePrimary/10 px-3 py-1.5 text-[0.7rem] font-medium text-purplePrimary hover:bg-purplePrimary/20 transition-colors"
              >
                Install App
              </button>
            )}
            <span className="hidden sm:inline">
              Your data never leaves this device.
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;

