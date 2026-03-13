const ACHIEVEMENTS_DEFS = [
  {
    id: 'first_recording',
    title: 'First Recording',
    icon: '🏅',
    description: 'Completed your first speaking session.',
  },
  {
    id: 'streak_3',
    title: '3 Day Streak',
    icon: '🔥',
    description: 'Spoke for 3 days in a row.',
  },
  {
    id: 'streak_7',
    title: '7 Day Streak',
    icon: '🔥',
    description: 'Spoke for 7 days in a row.',
  },
  {
    id: 'streak_30',
    title: '30 Day Streak',
    icon: '🚀',
    description: 'Spoke for 30 days in a row.',
  },
  {
    id: 'minutes_10',
    title: '10 Minutes Spoken',
    icon: '🎤',
    description: 'Reached 10 total minutes of speaking.',
  },
  {
    id: 'minutes_100',
    title: '100 Minutes Spoken',
    icon: '🎧',
    description: 'Reached 100 total minutes of speaking.',
  },
  {
    id: 'consistency_master',
    title: 'Consistency Master',
    icon: '🏆',
    description: 'Spoke for 7 consecutive days.',
  },
];

export const getAchievementDefinitions = () => ACHIEVEMENTS_DEFS;

export const createInitialAchievements = (existing = []) => {
  const existingById = new Map(
    (existing || []).map((a) => [a.id, a]),
  );

  return ACHIEVEMENTS_DEFS.map((def) => {
    const found = existingById.get(def.id);
    if (found) return found;
    return {
      ...def,
      unlocked: false,
      unlockDate: null,
    };
  });
};

export const evaluateAchievements = ({
  streak,
  lifetimeMinutes,
  recordingsCount,
  currentAchievements,
  todayIso,
}) => {
  const next = createInitialAchievements(currentAchievements);
  const newlyUnlocked = [];

  const conditions = {
    first_recording: recordingsCount >= 1,
    streak_3: streak >= 3,
    streak_7: streak >= 7,
    streak_30: streak >= 30,
    minutes_10: lifetimeMinutes >= 10,
    minutes_100: lifetimeMinutes >= 100,
    consistency_master: streak >= 7,
  };

  next.forEach((ach) => {
    if (ach.unlocked) return;
    if (conditions[ach.id]) {
      ach.unlocked = true;
      ach.unlockDate = todayIso || new Date().toISOString();
      newlyUnlocked.push(ach);
    }
  });

  return { nextAchievements: next, newlyUnlocked };
};

