import React, { useEffect } from 'react';

const CompletionModal = ({ isOpen, streak, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_160ms_ease-out_forwards]"
        onClick={onClose}
      />
      <div className="relative w-[92%] max-w-md rounded-3xl border border-antiqueWhite/10 bg-blackBg/90 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 md:p-7 animate-[popIn_180ms_ease-out_forwards]">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-purplePrimary/40 bg-purplePrimary/10 text-purplePrimary text-[0.7rem] uppercase tracking-[0.3em]">
          Success
        </div>

        <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-antiqueWhite">
          🎉 Session Complete!
        </h2>
        <p className="mt-2 text-sm md:text-base text-antiqueWhite/70">
          You completed your speaking session.
        </p>

        <div className="mt-5 rounded-2xl border border-antiqueWhite/10 bg-blackBg/60 px-4 py-3">
          <div className="text-sm md:text-base font-semibold text-antiqueWhite">
            🔥 Streak: <span className="tabular-nums">{streak}</span> days
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-purplePrimary px-6 py-3.5 text-base font-semibold text-antiqueWhite hover:bg-purplePrimary/90 transition-all focus:outline-none focus:ring-2 focus:ring-purplePrimary/70"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;

