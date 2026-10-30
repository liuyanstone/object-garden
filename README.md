# Object Garden / 寻物小花园

A bilingual, 90-second visual search game with **300 familiar, recognizable objects**. Each round selects **150 different objects**, with every target requested once. The curated pool replaces the former 1,000-item mixed catalog: the user approved a smaller collection to prioritize familiarity.

## Familiar objects and one illustration style

The collection covers everyday animals, plants/flowers, natural features, foods, household items, clothing, stationery/toys and transport. Specialist instruments, obscure cultural items, duplicate animal views and unfamiliar names have been removed. Chinese labels use everyday wording: 勺子, 红绿灯, 记事本 and 水壶. The kettle is a newly drawn ordinary kettle, not a French press with a changed label. Each object has a distinct Chinese name, English name and illustration.

All 300 images use the same flat, rounded illustration language, low-saturation Morandi palette, 72-unit canvas and consistent warm gray-green outlines. 269 are adapted OpenMoji illustrations (CC BY-SA 4.0); 31 are original SVG drawings of familiar objects. Every image’s painted silhouette is measured and fitted inside its circular placement area, so larger artwork still does not overlap its neighbors. There are no monochrome fantasy silhouettes or mixed icon systems in the active catalog. Artwork and its attribution are local; no external service is contacted during play. See credits.html, asset-credits.json, palette.json, tools/common-items.json and OPENMOJI-LICENSE.txt.

The catalog was reviewed in five 60-item contact sheets and in the actual desktop/mobile playing field. tools/build-catalog.mjs regenerates the assets from pinned OpenMoji sources and tools/original-art.mjs. It caches immutable source files in tools/source-cache/ (ignored by Git). Run it with Node.js and Python 3 with CairoSVG/Pillow for geometric paint measurement; optionally pass an absolute cache directory as its first argument. Modified OpenMoji images retain CC BY-SA 4.0; original artwork is identified separately in the source manifest.

## Play

Objects have scattered, non-overlapping positions, modest size variation, and small rotations. Their circular tap areas are at least 52 CSS pixels; scroll vertically on small screens. Placement is deterministic for a saved round and viewport width. Targets are text only during play. Correct taps earn 100 points; a wrong tap keeps the same target and does not subtract points. A round lasts 90 seconds of active play, or ends early after all 150 targets (15,000 points). Positions do not change while playing.

At the end, the last target's name and picture are shown. A high-contrast circle marks its original position among all 150 objects and the collection scrolls to it. A perfect round reviews the final found object. The ring follows responsive layout changes.

Large fonts, keyboard-accessible buttons, gentle sounds/mute, pause/resume, auto-pause when switching away, saved unfinished rounds, unlimited replay and highest completed score per local day. No login or backend; progress stays in this browser/device.

Catalog-version-5 checkpoints retain compatible current rounds. Older active rounds restart with familiar objects to avoid renamed or removed targets; historical completed daily scores are preserved. The existing localStorage key is unchanged.

## Check and publish

Serve this folder with a static HTTP server or publish its root on GitHub Pages. No build or runtime dependency is required. Run `node check.mjs` for random unique rounds, all target sequences, scores, timer, checkpoint migration, scatter spacing on desktop/mobile, source-file hashes, palette consistency, banned specialist names and end-of-round review. The game is not affiliated with Peak.
