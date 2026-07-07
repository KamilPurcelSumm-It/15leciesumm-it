# 15-lecie summ-it — landing page + rejestracja

Next.js 16 (App Router, TypeScript, Tailwind v4) + Prisma + SQL Server.
Layout odtworzony 1:1 wg projektu PDF/Canva. Formularz rejestracyjny zapisuje
zgłoszenia do jednej tabeli `Registration` w lokalnej bazie SQL Server.

## Uruchomienie od zera

```bash
npm install          # automatycznie odpali też `prisma generate` (postinstall)
# ustaw DATABASE_URL na lokalny connection string SQL Server
npm run db:push       # tworzy tabelę registrations w SQL Server
npm run dev            # http://localhost:3000
```

Jeśli `npm install` nie uruchomi `postinstall` (niektóre menedżery pakietów to
blokują), wykonaj ręcznie:

```bash
npx prisma generate
npx prisma db push
```

## Struktura

- `src/app/page.tsx` — strona złożona z sekcji: Hero, Agenda, Formularz, Miejsce, Stopka.
- `src/components/*` — poszczególne sekcje strony.
- `src/app/api/registrations/route.ts` — `POST` zapisuje zgłoszenie, `GET` zwraca listę (do podglądu/eksportu).
- `prisma/schema.prisma` — model `Registration` (jeden rejestr, jedna tabela).
- `src/lib/validation.ts` — wspólny schemat walidacji (Zod) używany przez formularz i API.
- `src/lib/prisma.ts` — singleton klienta Prisma.

## Podgląd zapisanych rejestracji

Najprościej przez Prisma Studio:

```bash
npm run db:studio
```

Otworzy się GUI na `http://localhost:5555` z podglądem tabeli `registrations`.

Alternatywnie, zapytanie `GET /api/registrations` zwraca wszystkie zgłoszenia
jako JSON (przydatne do szybkiego exportu — w produkcji warto je zabezpieczyć
autoryzacją, jeśli endpoint ma zostać publicznie dostępny).

## Własne zdjęcia

W kodzie zostawione są oznaczone placeholdery (obramowanie przerywaną linią +
komentarz `TODO`) w trzech miejscach:

1. `src/components/Hero.tsx` — zdjęcie w sekcji hero (`public/images/hero.jpg`).
2. `src/components/RegistrationForm.tsx` — zdjęcie obok formularza (`public/images/registration.jpg`).
3. `src/components/Venue.tsx` — zdjęcie/mapa obiektu (`public/images/venue.jpg`).

Aby podmienić: wrzuć pliki do `public/images/`, w danym komponencie zaimportuj
`Image` z `next/image` i zastąp placeholder komponentem `<Image fill ... />`
zgodnie z komentarzem w kodzie.

## Baza produkcyjna

Do Azure App Service najlepiej użyć SQL Server (np. Azure SQL Database albo lokalnej/hostowanej instancji MSSQL).

1. Ustaw `DATABASE_URL` na connection string SQL Server.
2. Dla lokalnego testu można użyć instancji MSSQL na localhost.
3. Dla Azure App Service podaj ten sam parametr przez Settings → Configuration jako zmienną środowiskową.
4. Uruchom `npx prisma db push` albo `npx prisma migrate deploy` na nowej bazie.

Przykład connection stringa lokalnego:

```env
DATABASE_URL="sqlserver://localhost:1433;database=summit15;user=sa;password=YourStrong!Passw0rd;trustServerCertificate=true;encrypt=true;"
```

Przykład dla Azure SQL:

```env
DATABASE_URL="sqlserver://<server>.database.windows.net:1433;database=<database>;user id=<user>;password=<password>;encrypt=true;trustServerCertificate=false;"
```

Reszta kodu (API route, walidacja, formularz) zostaje bez zmian.
