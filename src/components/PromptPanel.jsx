import React, { useMemo, useState } from 'react';

const PROMPT_CATEGORIES = {
  Storytelling: [
    'Tell a 2-minute story about a memorable day from your childhood.',
    'Describe a moment when you felt truly proud of yourself.',
    'Share a funny story that still makes you laugh when you think about it.',
  ],
  'Job Interview': [
    'Introduce yourself as if you are in a job interview for your dream role.',
    'Answer the question: “Tell me about a time you overcame a challenge.”',
    'Explain why you would be a great fit for a role you really want.',
  ],
  Debate: [
    'Argue for or against the idea that social media is good for society.',
    'Debate whether remote work is better than working in an office.',
    'Take a stance on: “Should university education be free?”',
  ],
  'Personal Reflection': [
    'Talk about one habit you want to build and why.',
    'Describe what a perfect day looks like for you.',
    'Reflect on a recent mistake and what you learned from it.',
  ],
};

const allPrompts = Object.values(PROMPT_CATEGORIES).flat();

const PromptPanel = () => {
  const [activeCategory, setActiveCategory] = useState('Storytelling');
  const [prompt, setPrompt] = useState(PROMPT_CATEGORIES.Storytelling[0]);

  const categories = useMemo(
    () => Object.keys(PROMPT_CATEGORIES),
    [],
  );

  const setRandomPrompt = (scope = 'category') => {
    if (scope === 'all') {
      const random =
        allPrompts[Math.floor(Math.random() * allPrompts.length)];
      setPrompt(random);
      return;
    }

    const list = PROMPT_CATEGORIES[activeCategory] || [];
    if (!list.length) return;
    const random = list[Math.floor(Math.random() * list.length)];
    setPrompt(random);
  };

  const handleCategoryClick = (name) => {
    setActiveCategory(name);
    const list = PROMPT_CATEGORIES[name] || [];
    if (list.length) {
      setPrompt(list[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.25em] text-antiqueWhite/60">
          Guided Prompt
        </span>
        <button
          type="button"
          onClick={() => setRandomPrompt('all')}
          className="text-[0.7rem] md:text-xs font-medium text-purplePrimary hover:text-purplePrimary/90 underline-offset-2 hover:underline"
        >
          Surprise me
        </button>
      </div>

      <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar">
        {categories.map((name) => {
          const isActive = name === activeCategory;
          return (
            <button
              key={name}
              type="button"
              onClick={() => handleCategoryClick(name)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-[0.7rem] md:text-xs border transition-colors ${
                isActive
                  ? 'bg-purplePrimary text-antiqueWhite border-purplePrimary'
                  : 'bg-blackBg/60 text-antiqueWhite/70 border-antiqueWhite/20 hover:border-purplePrimary/60'
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-antiqueWhite/12 bg-blackBg/70 px-4 py-3 text-left text-[0.78rem] md:text-sm text-antiqueWhite/90 leading-relaxed">
        {prompt}
      </div>
    </div>
  );
};

export default PromptPanel;

