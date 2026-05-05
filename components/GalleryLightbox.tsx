'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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
      <div className={['grid grid-cols-2 gap-2 transition duration-300 md:grid-cols-6 md:gap-3', activeImage ? 'blur-sm brightness-50' : ''].join(' ')}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={[
              'group relative block overflow-hidden bg-concrete/30 text-left transition hover:bg-concrete/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rust',
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

      {activeImage ? createPortal(
        <div
          className="flex items-center justify-center px-4 py-6 text-[#F5F1E8] md:px-8"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2147483647,
            background: 'rgba(17, 17, 17, 0.96)'
          }}
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
            className="absolute right-4 top-4 z-20 bg-[#F5F1E8] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-accent md:right-8 md:top-8"
          >
            Zavrieť
          </button>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-[#F5F1E8] text-3xl leading-none text-ink transition hover:bg-accent md:left-8"
            aria-label="Predchádzajúca fotografia"
          >
            ←
          </button>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-[#F5F1E8] text-3xl leading-none text-ink transition hover:bg-accent md:right-8"
            aria-label="Ďalšia fotografia"
          >
            →
          </button>
          <div className="flex h-[88vh] w-full max-w-7xl flex-col justify-center gap-4">
            <div className="relative min-h-0 flex-1">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 text-center text-xs text-[#F5F1E8]/82 md:flex-row md:justify-center md:gap-4">
              <span className="font-semibold uppercase tracking-[0.18em]">{activePosition} / {images.length}</span>
              <span className="text-sm leading-6">{activeImage.alt}</span>
            </div>
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
