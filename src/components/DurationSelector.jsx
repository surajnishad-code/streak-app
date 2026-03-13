import React from 'react';

const options = [20, 40, 60];

const DurationSelector = ({ selected, onSelect }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs uppercase tracking-[0.25em] text-antiqueWhite/60">
          Daily Goal
        </span>
        <span className="text-xs text-antiqueWhite/50">
          Tap to change duration
        </span>
      </div>
      <div className="flex gap-3 md:gap-4 flex-row">
        {options.map((minutes) => {
          const isActive = selected === minutes;
          return (
            <button
              key={minutes}
              type="button"
              onClick={() => onSelect(minutes)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm md:text-base font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purplePrimary/60 ${
                isActive
                  ? 'bg-purplePrimary text-antiqueWhite border-purplePrimary shadow-[0_0_20px_rgba(123,44,191,0.6)] scale-[1.02]'
                  : 'bg-blackBg border-antiqueWhite/15 text-antiqueWhite/80 hover:border-purplePrimary/70 hover:bg-purplePrimary/10'
              }`}
            >
              {minutes} min
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DurationSelector;

