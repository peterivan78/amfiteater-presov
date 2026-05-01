# Amfiteáter Prešov — starter projekt

Next.js + Supabase scaffold pre one-page web s administráciou podujatí.

## Obsah

- verejná homepage `/`
- admin login `/login`
- admin dashboard `/admin`
- nové podujatie `/admin/events/new`
- editácia podujatia `/admin/events/[id]`
- automatické delenie podujatí na najbližšie a archív podľa `start_at`
- upload obrázkov do Supabase Storage

## 1. Lokálny setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Supabase setup

V Supabase vytvor nový projekt.

Potom spusti v SQL Editore:

1. `supabase/schema.sql`
2. `supabase/storage.sql`

V Supabase Auth nastav:

- Site URL: `http://localhost:3000`
- Redirect URL: `http://localhost:3000/auth/callback`

Pre produkciu neskôr pridaj:

- `https://tvoja-domena.sk`
- `https://tvoja-domena.sk/auth/callback`

## 3. Environment variables

Do `.env.local` doplň:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` je pripravený pre budúce server-side operácie. Nepoužívaj ho v client komponentoch.

## 4. Admin používateľ

V Supabase Auth povoľ Email OTP / Magic Link.

Prihlásenie funguje cez `/login`.

V aktuálnom starteri môžu eventy spravovať všetci prihlásení používatelia. Pre produkciu odporúčané doplnenie: tabuľka `admin_users` alebo kontrola podľa konkrétneho emailu.

## 5. Deploy na Vercel

1. pushni projekt na GitHub
2. importuj projekt vo Verceli
3. doplň env premenné
4. nastav vlastnú doménu
5. v Supabase doplň produkčné Auth redirect URL

## 6. Čo treba ešte doladiť

- finálne texty homepage
- logo a vizuálny systém
- fotky priestoru
- prísnejšia admin autorizácia podľa emailu
- lepšie spracovanie obrázkov
- loading/error stavy
- prípadné filtrovanie archívu podľa roka

## 7. Prompt pre Codex na pokračovanie

```text
Toto je Next.js + Supabase starter pre web Amfiteáter Prešov. Skontroluj projekt, oprav prípadné chyby kompatibility s aktuálnou verziou Next.js/Supabase, doplň bezpečnú admin autorizáciu len pre povolené emaily, zlepši UX formulára pre mobil, pridaj loading/error stavy a priprav projekt na deploy na Vercel.
```
