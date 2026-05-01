# Project status

## Current project

- Project: Amfiteáter Prešov website
- Stack: Next.js 15.2.8, React 19, Tailwind CSS 3.4.17, Supabase
- GitHub repo: https://github.com/peterivan78/amfiteater-presov
- Vercel preview: https://amfiteater-presov.vercel.app

## What is already done

- The project was fixed to run locally.
- Deprecated Supabase auth helpers were removed.
- Supabase setup now uses `@supabase/ssr` and `@supabase/supabase-js`.
- `next/image` is configured for:
  - `placehold.co`
  - Supabase image URLs
- Next.js workspace root warning was addressed in `next.config.mjs`.
- Tailwind/PostCSS setup is aligned to Tailwind 3.
- Next.js was upgraded from `15.2.4` to `15.2.8` because Vercel blocks `15.2.4` as vulnerable.
- Initial deploy to Vercel is working.
- Supabase preview auth redirect was configured for the Vercel preview URL.

## Visual/content changes already done

- Old assets from the previous Blocs website were reviewed.
- Selected assets were copied into `public/assets`.
- Current usage:
  - hero image: `public/assets/hero_1.webp`
  - logo: `public/assets/logo.svg`
  - info section image: `public/assets/historia.webp`

## Important files

- `next.config.mjs`
- `package.json`
- `lib/supabase-config.ts`
- `lib/supabase-browser.ts`
- `lib/supabase-server.ts`
- `app/auth/callback/route.ts`
- `components/Hero.tsx`
- `components/InfoSections.tsx`
- `CODEX_prompt_home_start.md`

## Environment variables required

The project expects `.env.local` with at least:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Vercel preview, `NEXT_PUBLIC_SITE_URL` should match:

```env
NEXT_PUBLIC_SITE_URL=https://amfiteater-presov.vercel.app
```

## What is intentionally NOT being done yet

- No production domain cutover yet
- No DNS / Websupport changes yet
- No redirect setup for `amfiteaterpresov.sk` yet
- No major redesign yet

## Recommended next work

1. Improve homepage content and copy.
2. Reuse more quality assets from `old_web`.
3. Refine section structure and visual polish.
4. Improve admin UX for events.
5. Only after that: configure production domain and final redirects.
