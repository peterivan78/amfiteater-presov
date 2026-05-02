'use client';

import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

function slugifyQuestion(question: string) {
  return question
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="mt-6 divide-y divide-black/10 border-y border-black/10">
      {items.map((item) => {
        const isOpen = openQuestion === item.question;
        const id = `faq-answer-${slugifyQuestion(item.question)}`;

        return (
          <div key={item.question} className="py-4">
            <h3 className="text-base font-medium">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-6 text-left outline-none transition hover:text-accent focus-visible:text-accent"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpenQuestion(isOpen ? null : item.question)}
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className={`text-xl leading-none text-black/35 transition ${isOpen ? 'rotate-45' : ''}`}>+</span>
              </button>
            </h3>
            <div id={id} hidden={!isOpen}>
              <p className="mt-3 leading-7 text-black/65">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
