import React from 'react';

const AchievementCard = ({ achievement }) => {
  const { icon, title, description, unlocked } = achievement;

  return (
    <div
      className={`relative rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 shadow-sm hover:shadow-md ${
        unlocked
          ? 'border-purplePrimary/40 bg-purplePrimary/10 hover:bg-purplePrimary/15'
          : 'border-antiqueWhite/10 bg-blackBg/40 opacity-60 grayscale hover:opacity-80'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${
            unlocked
              ? 'bg-purplePrimary/20'
              : 'bg-blackBg/60 border border-antiqueWhite/15'
          }`}
        >
          <span>{icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-antiqueWhite">
              {title}
            </h3>
            <span
              className={`text-[0.65rem] uppercase tracking-[0.2em] ${
                unlocked
                  ? 'text-purplePrimary'
                  : 'text-antiqueWhite/40'
              }`}
            >
              {unlocked ? 'Unlocked' : 'Locked'}
            </span>
          </div>
          <p className="mt-1 text-[0.7rem] text-antiqueWhite/70">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;

