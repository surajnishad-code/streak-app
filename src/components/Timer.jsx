import React from 'react';

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Timer = ({ remainingSeconds }) => {
  return (
    <div className="mt-8 text-center">
      <div className="text-xs uppercase tracking-[0.25em] text-antiqueWhite/60 mb-2">
        Today&apos;s Session
      </div>
      <div className="inline-flex items-center justify-center rounded-3xl border border-antiqueWhite/15 bg-blackBg/70 backdrop-blur-sm px-10 py-5 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
        <span className="text-4xl md:text-5xl font-semibold tabular-nums tracking-[0.35em] text-antiqueWhite">
          {formatTime(remainingSeconds)}
        </span>
      </div>
    </div>
  );
};

export default Timer;

