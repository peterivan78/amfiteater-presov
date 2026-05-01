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
- voliteľný koniec podujatia pre viacdňové programy

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
ADMIN_EMAILS=admin@example.com
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`SUPABASE_SERVICE_ROLE_KEY` je pripravený pre budúce server-side operácie. Nepoužívaj ho v client komponentoch.

## 4. Admin používateľ

V Supabase Auth povoľ Email OTP / Magic Link.

Prihlásenie funguje cez `/login`.

Do `ADMIN_EMAILS` doplň povolené admin emaily oddelené čiarkou.

V Supabase SQL editore vlož rovnaké emaily aj do tabuľky `admin_users`:

```sql
insert into public.admin_users (email)
values ('admin@example.com')
on conflict do nothing;
```

Potom spusti aktualizované `supabase/schema.sql` a `supabase/storage.sql`, aby boli eventy a upload obrázkov zapisovateľné iba povolenými adminmi.

Obrázky v admin formulári sa ukladajú ako WebP bez orezania. Plagát je povinný a má max. šírku 1080 px. Cover vizuál je voliteľný pre zvýraznené podujatia a má max. šírku 1600 px. Formulár prijíma JPG, PNG a WebP; PDF a SVG odmietne. Pri viacdňových podujatiach vyplň aj pole `Koniec`.

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
