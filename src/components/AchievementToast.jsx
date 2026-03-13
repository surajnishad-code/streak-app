import React, { useEffect } from 'react';

const AchievementToast = ({ achievement, onClose }) => {
  useEffect(() => {
    if (!achievement) return;
    const t = window.setTimeout(() => {
      onClose?.();
    }, 3500);
    return () => window.clearTimeout(t);
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto max-w-sm w-full rounded-2xl border border-purplePrimary/60 bg-blackBg/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.9)] animate-[popIn_180ms_ease-out_forwards]">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 text-xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-purplePrimary">
              Achievement Unlocked
            </div>
            <div className="mt-1 text-sm font-semibold text-antiqueWhite">
              {achievement.title}
            </div>
            <div className="mt-0.5 text-[0.75rem] text-antiqueWhite/75">
              {achievement.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementToast;

