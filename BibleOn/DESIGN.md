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
- `.feature-item` ivory card, four groups in a 2×2 grid; icon = inline SVG stroke 1.7 in warm wash chip. No emoji icons.
- `.screenshot-gallery` snap-scroll strip, radius 20, hidden scrollbar, edge-fade mask.
- `.reviews-grid` CSS-columns masonry (3/2/1). `.review-card` inner class names are a fetch_reviews.py contract — style only.
- FAQ `details` hairline list, CSS "+" marker rotating 45°.
- `#download .download-panel` terracotta gradient panel radius 32.

## 3. Accessibility & Debt
- Focus: `:focus-visible` 2px accent ring everywhere (only colored edge allowed).
- Reveal classes added by JS only → no-JS users see full content.
- Debt: review stars are ⭐ text from the generator script (accepted). The page intentionally keeps its light editorial theme under both system color schemes; dark mode is an app feature, not a landing-page theme.

## 4. Layout — 2026-10-25 content refresh
- Layout: hero, cards, mosaic — pair product evidence with its explanation -> split-screen (https://github.com/changeroa/StyleGallery/blob/main/patterns/split-sidebar/split-screen.md); scroll owner: document; anti-patterns: no nested vertical scrolling or CSS reordering of reading order. Two columns above 960px, one column below.
- Layout: app previews and SNS videos — browse a sequence without lengthening the page -> reel (https://github.com/changeroa/StyleGallery/blob/main/patterns/in-line-grouping/reel.md); scroll owners: `.screenshot-gallery`, `.verse-gallery` horizontally, document vertically; anti-patterns: no page-wide horizontal overflow, no swipe-only access.
- Layout: English promotional video — one portrait clip with native playback controls in a centered frame; document owns vertical scrolling. Keep the complete video ratio, with no crop, autoplay, or nested vertical scrolling.
- New product panels use the existing ivory, band and accent-wash tokens, 28px corners, and 24/32/48px gaps. Screenshots retain their native ratio; the mosaic close-up crops only the actual board, with its example progress stated.
- Hero: 560px visual region on desktop, responsive paired screens on mobile. Main display remains Paperlogy; secondary notes use `--ink-2` for contrast.

## 5. Page brief — latest Android features, iOS update planned
- Primary action: download the app. Google Play is the primary filled button; App Store is an equally sized secondary button.
- Information priorities: (1) illustrated daily Scripture, (2) keep and revisit verse cards, (3) build a mosaic through reflection and memorization.
- Required content: store links and analytics classes; fetched rating/review/install anchors; authentic review block and generator markers; all eight latest store screenshots; reflection, emotion, memorization, calendar, church calendar, statistics, reminders, widgets and dark mode; independent SNS video gallery; privacy link; FAQ and matching structured data.
- New Android feature sections state that the corresponding iOS update is planned. Do not promise a release date, cloud storage, automatic archiving of every verse, or a consecutive 100-day requirement.
- Left out on purpose: a release changelog, duplicated promotional captions in the hero, a donation sales section, extra decorative badges and feature-count headlines.
- Assets: Android 1.8.1 original captures for the hero/product sections; the eight Korean store exports for the preview reel. Ship resized WebP derivatives; retain old PNG assets for existing external links.
- Language support: Korean and English page copy, with a compact language link beside the download action. First visits follow the browser language; explicit `?lang=ko` / `?lang=en` links override the remembered choice. Keep download as the primary action.
- Translate navigation, product descriptions, FAQ, metadata and image descriptions. English uses the actual English store exports and Android captures; hide Korean reviews and their navigation link. Privacy links identify the Korean policy.
- Layout: keep the existing navigation row and product layouts; hide section links below 960px to leave room for the language control. Check Korean and English at 320px, 390px and 1440px, under both system color schemes.
- English assets: `/Users/isjang98/bibleOn/BibleOn/store/listing/en/` (eight store exports and feature graphic), `store/screenshot-studio/public/screenshots/android/phone/en/` in the same app repository (home, card, gallery, mosaic), and `/Users/isjang98/Downloads/icon/bibleon_icon_en.png`. WebP derivatives live in `images/en/`. The mosaic crop retains its actual English UI, including the Korean artwork visible in the source capture.
- English video: `/Users/isjang98/Downloads/_영상/bibleon_emotional_real_screens_english_clean_8s.mp4`, eight seconds with English captions. Preserve its audio while optimizing it for the web. Show it with native controls and note that its app screens are from an earlier version. Korean retains its eight SNS animations and sound controls.
- The Android app selects Korean or English Scripture based on the device language (`BibleOnContentActivity.getBibleOn`); do not describe it as Korean-only or invent an English Bible translation name.
