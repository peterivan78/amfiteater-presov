'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type GalleryImage = {
  src: string;
  alt: string;
};

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activePosition = activeIndex === null ? 0 : activeIndex + 1;

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
      if (event.key === 'ArrowLeft') setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, images.length]);

  function showPrevious() {
    setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length));
  }

  function showNext() {
    setActiveIndex((current) => (current === null ? current : (current + 1) % images.length));
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={[
              'group relative block overflow-hidden bg-[#B7AEA2]/30 text-left transition hover:bg-[#B7AEA2]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D4B3E]',
              index === 0 ? 'col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/3]' : 'aspect-[4/3]'
            ].join(' ')}
            aria-label={`Otvoriť fotografiu: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover saturate-[0.82] transition duration-500 group-hover:scale-[1.035]"
              sizes="(max-width: 768px) 50vw, 16vw"
            />
          </button>
        ))}
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111111]/94 px-4 py-6 text-[#F5F1E8] md:px-8"
          role="dialog"
          aria-modal="true"
          aria-label="Fotogaléria Amfiteáter Prešov"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 border border-[#F5F1E8]/25 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:border-[#C8A46B] hover:text-[#C8A46B] md:right-8 md:top-8"
          >
            Zavrieť
          </button>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-4xl leading-none text-[#F5F1E8]/70 transition hover:text-[#C8A46B] md:left-8"
            aria-label="Predchádzajúca fotografia"
          >
            ←
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-4xl leading-none text-[#F5F1E8]/70 transition hover:text-[#C8A46B] md:right-8"
            aria-label="Ďalšia fotografia"
          >
            →
          </button>
          <div className="relative h-[78vh] w-full max-w-6xl">
            <Image src={activeImage.src} alt={activeImage.alt} fill className="object-contain" sizes="100vw" priority />
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-4 text-center text-xs uppercase tracking-[0.18em] text-[#F5F1E8]/62">
            <span>{activePosition} / {images.length}</span>
            <span className="hidden max-w-xl normal-case tracking-normal md:inline">{activeImage.alt}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
