import React from 'react';

const LogoScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blackBg via-blackBg to-[#12001f]">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(123,44,191,0.5),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(250,235,215,0.15),_transparent_55%)]" />
      <div className="relative animate-fadeInOut flex flex-col items-center gap-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.6em] text-purplePrimary drop-shadow-[0_0_35px_rgba(123,44,191,1)]">
          STREAK
        </h1>
        <span className="text-xs md:text-sm tracking-[0.25em] uppercase text-antiqueWhite/60">
          Speaking Habit
        </span>
      </div>
    </div>
  );
};

export default LogoScreen;

