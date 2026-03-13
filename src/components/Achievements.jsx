import React from 'react';
import AchievementCard from './AchievementCard.jsx';

const Achievements = ({ achievements }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section className="mt-2">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.25em] text-antiqueWhite/60">
          Achievements
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {achievements.map((ach) => (
          <AchievementCard key={ach.id} achievement={ach} />
        ))}
      </div>
    </section>
  );
};

export default Achievements;

