# BibleOn(말씀온) Landing — Design System

## 0. Research Log
- Redesign audit (redesign-skill): current theme = neo-brutalism (3px black borders, hard offset shadows, rainbow bento, uppercase CTA) — dated, clashes with the app's warm hand-drawn identity.
- Embedded reference: warm-editorial parchment system (CLAUDE.md layer B) — warm cream canvas, serif display, single terracotta accent, ring/soft shadows. Chosen: brand-matches the app icon (red-orange) and in-app cream/illustration style.
- App screenshots (shot_01~08) harvested for palette: cream `#FAF7F0`-family backgrounds, warm ink, coral/orange accents.
- Inspo/lazyweb lanes skipped: direction fully determined by app's own brand assets + loaded reference; single-file vanilla page.

## 1. Tokens
Color
- `--bg #FAF7F0` warm cream canvas · `--surface #FFFFFF` · `--ivory #FFFDF8`
- `--ink #2A241E` warm near-black · `--ink-2 #5F564C` secondary · `--ink-3 #8E8478` tertiary
- `--accent #D9634E` terracotta (app icon) · `--accent-deep #C24F3B` · `--accent-wash #F9E8E2`
- `--gold-wash #F5EEDF` · `--band #F4EDE0` (section band)
- `--line #EBE3D5` hairline
- One accent family only. All grays warm-tinted. No purple/blue gradients.

Type
- Display/headings: 'Paperlogy' 800 (h1/h2), 600-700 보조 — noonnu CDN(projectnoonnu/2408-3) woff2 self-hosted @font-face, `font-display: swap`, ExtraBold preload. letter-spacing -0.02em, `text-wrap: balance`
- Body/UI: Pretendard Variable, 400/500/600/700, line-height 1.75, `word-break: keep-all`
- Hero display clamp(2.3rem→3.4rem); section h2 clamp(1.6rem→2.1rem)

Space & Shape
- Container 1120px / 24px gutter. Section padding 110px desktop / 72px mobile.
- Radii: 28 (panels) / 20 (cards) / 12 (chips) / 999 (pills)
- Shadows warm-tinted: `0 24px 60px -28px rgba(96,64,40,.28)` (soft), `0 12px 32px -18px rgba(96,64,40,.20)` (card)

Motion
- GPU only (transform/opacity), 200–300ms ease; reveal = fade + 18px rise via IntersectionObserver, staggered ≤240ms; `prefers-reduced-motion` disables reveals.
- Hover: cards translateY(-4px); buttons translateY(-2px); active scale(.98).

## 2. Primitives
- `.site-nav` fixed glass nav (blur + cream 82%), hairline on scroll; active CTA pill.
- `.cta-button` solid ink pill (store badges), white icon/text; inside accent panel → white surface variant. Classes `cta-button--android/--ios` are an analytics contract — never rename.
- `.trust-badge` white pill, hairline, `data-rating/data-reviews/data-installs` spans are a fetch_reviews.py contract.
- `.feature-item` ivory card, 12-col grid (2×span6 + 3×span4 + 2×span6); icon = inline SVG stroke 1.7 in warm wash chip. No emoji icons.
- `.screenshot-gallery` snap-scroll strip, radius 20, hidden scrollbar, edge-fade mask.
- `.reviews-grid` CSS-columns masonry (3/2/1). `.review-card` inner class names are a fetch_reviews.py contract — style only.
- FAQ `details` hairline list, CSS "+" marker rotating 45°.
- `#download .download-panel` terracotta gradient panel radius 32.

## 3. Accessibility & Debt
- Focus: `:focus-visible` 2px accent ring everywhere (only colored edge allowed).
- Reveal classes added by JS only → no-JS users see full content.
- Debt: review stars are ⭐ text from the generator script (accepted); hero uses store-marketing screenshots with baked-in captions (accepted until clean device frames exist).
