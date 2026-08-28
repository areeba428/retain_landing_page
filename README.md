# Retain — landing page

Marketing site for **Retain**, an AI study companion built around spaced retrieval practice.
Bright, playful visual direction: sky gradient with soft clouds, bold near-black display type,
black pill buttons and white cards with colourful art.

- **Frontend:** Vite + React 19 + TypeScript + Tailwind CSS v4
- **Backend:** FastAPI + Uvicorn (serves the built bundle and the email signup endpoint)

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

`/api/*` requests from the dev server are proxied to `http://127.0.0.1:8000`, so run the API
alongside it when you want the signup form to work.

## API server

```bash
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt   # macOS/Linux: .venv/bin/python
npm run build                                                  # creates dist/
.venv\Scripts\python.exe -m uvicorn server.main:app --port 8000
```

The whole site is then served from <http://127.0.0.1:8000>.

| Endpoint      | Method | Purpose                                                        |
| ------------- | ------ | -------------------------------------------------------------- |
| `/api/health` | GET    | Status, whether `dist/` exists, and the current signup count.   |
| `/api/signup` | POST   | `{"email": "..."}` — validated, de-duplicated, appended to disk. |
| `/{path}`     | GET    | Static files from `dist/`, falling back to `index.html`.         |

Signups are appended as JSON lines to `data/signups.jsonl` (override with `RETAIN_SIGNUP_LOG`).
Swap `signup()` for your ESP or database call when you have one.

Interactive API docs: <http://127.0.0.1:8000/docs>

## Structure

```
index.html
public/
  students-1600.jpg        hero photo (900px variant served to phones)
src/
  App.tsx                  section order
  index.css                design tokens, base styles, utilities
  components/
    Nav.tsx                floating pill nav
    Hero.tsx               sky, clouds, headline, CTAs, student photo, school marquee
    HeroShowcase.tsx       review-session mock with floating stat chips
    Statement.tsx          bold statement, headline stats, mastery forecast
    Features.tsx           Capture / Recall / Schedule / Mastery cards
    Science.tsx            forgetting-curve chart
    HowItWorks.tsx         four auto-advancing steps with product mocks
    Stats.tsx              count-up metrics
    Testimonials.tsx       student quotes
    Pricing.tsx            three tiers, monthly/yearly toggle
    Faq.tsx                accordion
    FinalCta.tsx           gradient panel with the signup form
    Footer.tsx
    Sky.tsx                clouds, colour blobs, twinkling stars
    Reveal.tsx             scroll-reveal wrapper and useInView
    primitives.tsx         Logo, Button, Pill, Highlight, headings
server/main.py
```

## Design tokens

Defined in `src/index.css` under `@theme`, so they are available as Tailwind utilities:

| Token                            | Value              | Used for                     |
| -------------------------------- | ------------------ | ---------------------------- |
| `ink` / `ink-soft`               | `#0d1526`/`#26364f` | Headlines, dark buttons      |
| `slate` / `slate-soft`           | `#5a6a85`/`#8fa0b8` | Body copy, meta labels       |
| `sky` / `sky-deep`               | `#dcefff`/`#b6dcff` | Backgrounds, highlight marker |
| `violet` `azure` `mint` `sun` `coral` `blush` | accents | Gradients, card art, charts |

`panel` (white card + soft shadow), `lift` (hover raise) and `shell` (page gutter) are custom
utilities in the same file. All animation respects `prefers-reduced-motion`.

## Build and deploy

```bash
npm run build        # tsc -b && vite build → dist/
npm run preview
```

`dist/` is a static bundle, so it deploys to Netlify or Vercel as-is (`netlify.toml` and
`vercel.json` are included). If you want the signup endpoint in production, deploy `server/main.py`
to any Python host and point `/api` at it.
