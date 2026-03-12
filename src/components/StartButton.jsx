import React from 'react';

const StartButton = ({ isRunning, isPaused, onStart, onPause, onResume }) => {
  const isIdle = !isRunning && !isPaused;

  const primaryLabel = isIdle
    ? 'Start Speaking'
    : isPaused
    ? 'Resume Speaking'
    : 'Speaking in progress...';

  const handlePrimaryClick = () => {
    if (isIdle && onStart) {
      onStart();
    } else if (isPaused && onResume) {
      onResume();
    }
  };

  const primaryDisabled = isRunning && !isPaused;

  return (
    <div className="mt-10 w-full max-w-md mx-auto flex flex-col gap-3">
      <button
        type="button"
        onClick={handlePrimaryClick}
        disabled={primaryDisabled}
        className={`w-full rounded-2xl px-6 py-4 text-base md:text-lg font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purplePrimary/70 ${
          primaryDisabled
            ? 'bg-purplePrimary/40 text-antiqueWhite/70 cursor-not-allowed'
            : 'bg-purplePrimary text-antiqueWhite hover:bg-purplePrimary/90 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_8px_20px_rgba(0,0,0,0.6)]'
        }`}
      >
        {primaryLabel}
      </button>

      {isRunning && !isPaused && (
        <button
          type="button"
          onClick={onPause}
          className="w-full rounded-2xl px-6 py-3 text-sm md:text-base font-medium tracking-wide border border-purplePrimary/60 text-purplePrimary bg-transparent hover:bg-purplePrimary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purplePrimary/70"
        >
          Pause
        </button>
      )}
    </div>
  );
};

export default StartButton;

