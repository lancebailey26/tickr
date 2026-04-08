# Tickr

Tickr is a **watch reference catalog**: browse brands, pick a model, and see what is in the database today. The app is a **work in progress**—the current UI and data model are intentionally small so the project can grow without painting us into a corner.

## Status: work in progress

What you see now is an early slice: a searchable catalog backed by MongoDB, with room to grow into a fuller research tool. Nothing here should be read as “feature complete.”

## Where this is headed

The long-term idea is a single place to explore watches with **depth**, not just names on a card. Planned directions include:

- **More brands** and broader coverage as data and sourcing improve.
- **More variations per model**—dial, case metal, bracelet, limited editions, regional differences, and other variants that matter to collectors.
- **Specifications**—dimensions, movement, water resistance, crystal, power reserve, and other structured fields so comparisons are possible.
- **Pricing context**
  - **MSRP** (or list price) where it is known and attributable.
  - **Secondary market signals**—aggregated or linked pricing from marketplaces such as **eBay** and similar sources, with clear caveats (condition, authenticity, fees, and time all affect “the price”).

Timing, data licensing, and implementation details for market data are still open; this README is the north star, not a commitment schedule.

## What works today

- Next.js (App Router) + TypeScript
- MongoDB for brands and watches
- REST-style routes: `GET /api/brands`, `GET /api/watches?brand=…`
- Client catalog: brand and model search, glass-style cards, optional images

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You will need a MongoDB connection configured for this app (for example via `.env.local`). Use whatever connection string and variable names your deployment expects; keep secrets out of git.

```bash
npm run build   # production build
npm run start   # run production server
npm run lint    # ESLint
```

## Stack (high level)

- **Framework:** Next.js, React
- **UI:** Skyforge UI (`@lancebailey26/skyforge-ui`)
- **Data:** MongoDB (`mongodb` driver)

---

Tickr is evolving.

Made with love by @lancebailey26 
