# Object Garden / 寻物小花园

A free, original visual search game with 30 familiar hand-drawn SVG object types. Each **90-second** round scatters **120 objects** (four of each type) in an irregular field, with varied positions, sizes and rotations and no grid or cards. A seeded placement algorithm checks circular art/hit bounds and leaves a gap between every pair. The layout stays fixed during a round and is reproducible on reload at the same viewport width. A responsive field keeps each object at least 46 CSS pixels across; scroll vertically to explore the collection on a smaller screen.

The target is **text only**. Tap any matching copy to earn 100 points and receive a different target. Wrong taps give gentle feedback and keep the same target with no extra score penalty. There are no lives or early failures.

English/Chinese, large text, touch/keyboard-accessible buttons, gentle synthesized sounds with a mute option, pause/resume, automatic pause on tab switch or window blur, saved unfinished rounds and highest completed score per local day. Replays use new random collections. Progress is local to the same browser and device; no login or backend. Pausing conceals the target and collection. The game has original art and implementation and is not affiliated with Peak.

Serve this folder with any static server, or publish its root with GitHub Pages. No build dependencies or external assets are required. Run `node check.mjs` for gameplay, timer, target generation, scoring, save validation and translation checks.

Completed daily best scores are retained from earlier versions. Unfinished 24-tile/60-second rounds restart with the new 120-object/90-second rules. Run `node check.mjs` to check targets, scoring, timer, saves and non-overlapping placements across desktop and mobile widths.
