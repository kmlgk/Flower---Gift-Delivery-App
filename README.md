# Bloomora — Flower & Gift Delivery HTML Template

A premium, production-ready HTML5 + Tailwind CSS (CDN) + Vanilla JS template for a flower & gift delivery business with live order tracking and a customer dashboard.

No Node.js, npm, or build tools required — **just open any `.html` file in a browser.**

## Tech stack

- HTML5 (semantic, accessible, SEO-friendly)
- Tailwind CSS via CDN + a small custom config (`assets/js/tailwind-config.js`)
- Vanilla ES6 JavaScript (no framework)
- Animation libraries via CDN: GSAP + ScrollTrigger, Lenis (smooth scroll), AOS, Swiper, SplitType, Typed.js, CountUp.js, GLightbox, Isotope, VanillaTilt (3D tilt cards)
- Real photography loaded from Unsplash's CDN (`images.unsplash.com`, sized via URL params for performance) mixed with the original hand-built SVG illustrations

## 3D & photography

- `.tilt-card` + `data-tilt` → any card gets a mouse-reactive 3D tilt + glare (VanillaTilt). Per-card overrides: `data-tilt-max`, `data-tilt-glare`.
- `.hero-3d` + `data-3d-hero` on a container, `data-depth="0.4..1.6"` on its children → a mousemove/gyroscope-driven layered parallax hero (see the Home 1 and Home 2 heroes). Higher depth = more movement.
- `.flip-card` / `.flip-card-inner` / `.flip-card-face` / `.flip-card-back` → CSS 3D flip card (hover on desktop, tap on touch), see `style.css`.
- Isotope-filtered grids (Services page) keep tilt on an **inner** anchor while Isotope positions the **outer** wrapper — don't put `data-tilt` directly on `.iso-item`, or the two libraries will fight over the `transform` style.

## Folder structure

```
├── index.html            Home 1
├── home-2.html           Home 2
├── about.html
├── services.html
├── service-details.html
├── blog.html
├── blog-details.html
├── login.html
├── register.html
├── dashboard.html        Customer dashboard (orders, live tracking, history, favorites)
├── pricing.html
├── contact.html
├── 404.html
├── coming-soon.html
├── assets/
│   ├── css/style.css            Theme tokens, dark/light, RTL, animation utilities
│   ├── js/tailwind-config.js    Tailwind color/font/animation config
│   ├── js/components.js         Shared header, mega menu, mobile menu, footer, CTA, breadcrumb
│   ├── js/main.js               Preloader, scroll progress, GSAP/AOS/Swiper/Typed/CountUp inits
│   ├── js/dashboard.js          Dashboard tab switching + live tracking simulation
│   ├── images/                  Custom SVG illustrations (bouquets, gifts, hero art, patterns)
│   └── icons/, fonts/, vendor/, videos/   (reserved — fonts & icons loaded via CDN)
├── documentation/index.html
├── README.md
└── LICENSE.txt
```

## How shared components work

Every page includes two empty containers:

```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
```

`assets/js/components.js` injects the header (with mega menu + mobile accordion), footer, CTA banners (`<div data-cta data-title="..." data-sub="..." data-btn="..." data-href="...">`) and breadcrumb heroes (`<div data-breadcrumb data-title="..." data-parent="..." data-parent-href="...">`) into these containers at runtime. This keeps markup in **one place** with **zero duplication** across pages, while still working from `file://` (no fetch/CORS issues since it's plain JS, not HTML partial loading).

Active nav state is set via `<body data-page="home|about|services|blog|pages|contact">`.

## Dark mode, RTL & theme persistence

- Toggle buttons in the header (desktop + mobile) call `Bloomora.toggleTheme()` / `Bloomora.toggleDir()` (defined in `main.js`).
- Preferences are saved to `localStorage` and re-applied via a tiny inline script in `<head>` on every page (no flash of wrong theme).
- RTL is applied via `dir="rtl"` on `<html>`; layout mirrors with Tailwind + a few `.rtl-flip` helper rules in `style.css`.

## Customizing

- **Brand colors / fonts / animation keyframes** → `assets/js/tailwind-config.js`
- **Nav links & mega menu content** → the `NAV` array at the top of `assets/js/components.js`
- **Global theme tokens (light/dark surfaces, borders)** → CSS variables at the top of `assets/css/style.css`
- **Illustrations** → swap any file in `assets/images/` (all hand-built SVG, so they're easy to recolor by editing the `fill` values)

## Performance notes

- All imagery is lightweight inline-style SVG (no raster photos) — pages stay well under typical ThemeForest weight budgets.
- Images use `loading="lazy"` with a CSS fade-in on load.
- Only pages that need a given animation library load its CDN script (check the bottom of each HTML file).

## Browser support

Latest Chrome, Edge, Firefox, Safari. Uses CSS `backdrop-filter` (glass header) and `prefers-color-scheme` — both broadly supported in modern evergreen browsers.

## License

See `LICENSE.txt`.
