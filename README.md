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

`@lancebailey26/skyforge-ui` is installed from **GitHub Packages**. Your machine (and any host that runs `npm install`) must authenticate to `npm.pkg.github.com`.

**Local install**

1. Create a [GitHub personal access token](https://github.com/settings/tokens) with the **`read:packages`** scope (classic PAT), or a fine-grained token that can read packages for the `lancebailey26` account that publishes the library.
2. Either export it for the shell session, or add it to your user-level `~/.npmrc` (not committed):

   ```bash
   export NPM_TOKEN=ghp_your_token_here
   npm install
   ```

   The repo `.npmrc` wires the `@lancebailey26` scope to GitHub Packages and uses `${NPM_TOKEN}` for the registry token. If `NPM_TOKEN` is unset, `npm` may fall back to credentials in your user `~/.npmrc` depending on version and merge behavior—when in doubt, export `NPM_TOKEN` before installing.

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

You will need a MongoDB connection configured for this app (for example via `.env.local`). Use whatever connection string and variable names your deployment expects; keep secrets out of git.

### Deploying on Vercel

Vercel’s build runs `npm install` in a clean environment, so it has **no** GitHub Packages token unless you add one.

1. In the Vercel project: **Settings → Environment Variables**.
2. Add **`NPM_TOKEN`** (same value as a PAT with **`read:packages`**), enabled for **Production** and **Preview** (and Development if you use Vercel’s cloud dev).
3. Redeploy.

Without `NPM_TOKEN`, installs fail with **`401 Unauthorized`** on `npm.pkg.github.com`.

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
