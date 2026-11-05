# Muhammad Luqman — Engineering Portfolio

A Next.js App Router portfolio for electrical engineering projects, with a
small content layer that can be edited without changing the page components.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. Run `npm run check` for the
TypeScript and production-build checks.

## Edit the portfolio content

- Profile, education, focus areas, navigation, and contact links:
  `src/data/portfolio.ts`
- Project titles, summaries, tags, and artifact notes:
  `src/data/portfolio.ts`
- Instrumentation-amplifier layout image: `public/project-art/`

Project descriptions are limited to the supplied files and report material; no
performance claims are included.

## Production deployment

Run `npm ci` and `npm run check` before publishing. Vercel can detect this
Next.js project automatically; use the repository root and the default Next.js
build settings. The current site does not read environment variables.

Contact links are configured in `src/data/portfolio.ts`.
