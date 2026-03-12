import React, { useEffect, useState } from 'react';

const StreakDisplay = ({ streak, lifetimeMinutes }) => {
  const [flameAnimate, setFlameAnimate] = useState(false);

  useEffect(() => {
    if (streak <= 0) return;
    setFlameAnimate(true);
    const t = window.setTimeout(() => setFlameAnimate(false), 320);
    return () => window.clearTimeout(t);
  }, [streak]);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="px-3 py-1 rounded-full bg-purplePrimary/10 border border-purplePrimary/40 text-purplePrimary text-[0.65rem] md:text-xs uppercase tracking-[0.35em]">
        Current Streak
      </div>
      <div className="flex items-end gap-4 mt-2">
        <span className="text-7xl md:text-9xl font-extrabold text-antiqueWhite drop-shadow-[0_0_35px_rgba(250,235,215,0.4)]">
          {streak}
        </span>
        <span
          className={`text-5xl md:text-6xl ${
            flameAnimate ? 'animate-[flamePop_320ms_ease-out]' : 'animate-pulse'
          }`}
        >
          🔥
        </span>
      </div>
      <div className="mt-4 flex flex-col items-center gap-1 text-antiqueWhite/70 text-sm md:text-base">
        <span className="uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-antiqueWhite/50">
          Lifetime Minutes Spoken
        </span>
        <span className="inline-flex items-baseline gap-1 text-lg md:text-2xl font-semibold text-antiqueWhite">
          <span className="tabular-nums">{lifetimeMinutes}</span>
          <span className="text-xs md:text-sm text-antiqueWhite/60">minutes</span>
        </span>
      </div>
    </div>
  );
};

export default StreakDisplay;

