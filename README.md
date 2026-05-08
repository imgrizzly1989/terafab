# TeraFab Atlas

TeraFab Atlas is a production-grade interactive industrial intelligence site explaining the scale, infrastructure, energy, compute, and geopolitical implications of a proposed TeraFab-class industrial system.

The project is intentionally moving from cinematic web documentary toward research-grade industrial intelligence: every visible metric should become traceable to a source, date, confidence category, confidence score, outlet, and methodology.

## Product direction

Design target:

- Bloomberg data journalism
- NASA technical restraint
- high-end architectural visualization
- cinematic industrial realism

Avoid:

- decorative dashboards
- generic AI aesthetics
- unsourced claims
- unnecessary animation bloat
- speculative data presented as fact

## Current frontend features

- Cinematic homepage built with Next.js App Router and Tailwind CSS
- Lazy-loaded Three.js industrial mega-city visualization
- Lazy-loaded Mapbox scale comparison engine with tokenless fallback
- Fact confidence system for metric evidence packets
- Confirmed / reported / estimated / speculative claim taxonomy
- Responsive layout and mobile-safe controls
- SEO metadata and structured data
- Accessibility-focused drawers, controls, and source packets
- WebGL performance safeguards: delayed loading, low-power mode, offscreen pause, cleanup

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js
- Mapbox GL JS
- Vercel deployment

## Requirements

- Node.js 22 recommended
- npm 10+

## Local setup

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open:

```txt
http://127.0.0.1:3000
```

## Production checks

Run before pushing or deploying:

```bash
npm run lint
npm run build
```

A full local production smoke test:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

## Environment variables

The site works without secrets.

Optional live Mapbox support:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_public_token_here
```

Notes:

- Do not commit `.env`, `.env.local`, or real tokens.
- If `NEXT_PUBLIC_MAPBOX_TOKEN` is missing, the scale comparison engine uses a cinematic fallback map.
- Public Mapbox tokens are still deployment configuration, not source code.

## Data credibility model

The platform uses four user-facing confidence categories:

- `confirmed` — direct official/primary support
- `reported` — reputable reporting, not primary confirmation
- `estimated` — derived from benchmarks, public datasets, or engineering assumptions
- `speculative` — scenario/model/editorial projection

Every production metric should resolve to:

- claim label
- displayed value
- confidence category
- confidence score
- source title
- source date
- reporting outlet
- source type
- methodology
- reviewer note
- last reviewed date

The current frontend contains a typed local claim registry. The next production phase should move this to Supabase/PostgreSQL with editorial review states.

## Architecture

```txt
src/app/                       App Router entrypoints and metadata
src/components/atlas/          Homepage sections and cinematic/industrial modules
src/components/facts/          Fact confidence provider, drawer, and triggers
src/components/scale-engine/   Mapbox/fallback scale comparison engine
src/lib/                       Domain data, claim registry, and scale calculations
public/                        Static assets
```

Heavy client systems are intentionally deferred:

- `TeraFabMegaCity` is dynamically imported and intersection-gated.
- `ScaleComparisonEngine` is dynamically imported and intersection-gated.
- Three.js imports are delayed where possible.
- Mapbox imports only run client-side and only when needed.

## Deployment to Vercel

Standard Vercel settings:

```txt
Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: .next
```

Optional environment variable in Vercel:

```txt
NEXT_PUBLIC_MAPBOX_TOKEN
```

Deploy with CLI:

```bash
vercel --prod
```

## Quality baseline

Recent local production audit baseline:

```txt
Performance:       95+
Accessibility:     96+
Best Practices:    100
SEO:               100
CLS:               0
```

Scores can vary by machine/browser state. Always ensure stale `next start` servers are killed before Lighthouse runs.

## Known limitations / next phase

The frontend architecture is stable. The next phase is not visual expansion. Priority should be institutional credibility and intelligence depth:

1. Supabase/PostgreSQL claims database
2. Source registry and citation tables
3. Claim revisions and editorial review workflow
4. Infrastructure intelligence models for power, cooling, water, logistics, land, permits, workforce, and grid constraints
5. Evidence library and methodology pages
6. Admin/editor interface for approving and publishing claims
7. Automated source freshness checks

## Security and repository hygiene

Ignored by default:

- `node_modules/`
- `.next/`
- `.vercel/`
- `.env*` except `.env.example`
- logs, coverage, local browser cache artifacts, and generated audit files

Never commit secrets or local deployment credentials.
