# Object Garden / 寻物小花园

Each **90-second** round chooses **150 different objects** from a catalog of **169 distinct illustrations**. Every displayed object appears exactly once. The field has irregular positions, sizes and rotations, with no grid or cards. Circular art/hit bounds are checked for spacing. Positions stay fixed during the round and are reproducible on reload at the same width. Objects have a minimum 46 CSS pixel tap diameter; scroll vertically to explore the field on smaller screens.

Targets are **text only**. A shuffled target order contains each displayed object once, with no repeats throughout the round. Correct taps earn 100 points; wrong taps keep the current target and do not advance the order or subtract points. Finding all 150 objects ends the round immediately with 15,000 points. Otherwise the round ends after 90 seconds of active play. The saved order and progress survive pause/resume and reload without resetting to previously requested objects.

English/Chinese, large text, touch/keyboard-accessible buttons, gentle synthesized sounds, mute control, pause/resume, automatic pause on tab switch/window blur, saved unfinished rounds, replay, and highest completed score per local day. Progress is local to the same browser and device; no login or backend. Earlier completed daily bests are retained. Older active rounds restart under the new no-duplicate rules.

The catalog combines original SVG illustrations with adapted [Lucide icons](https://lucide.dev/) pinned to revision `be09619c1c1124ad09c19fc3e87ee3b939409bbd`. Their ISC/MIT notices are included in [LUCIDE-LICENSE.txt](LUCIDE-LICENSE.txt). All art is served locally, with no external asset requests. The game is not affiliated with Peak.

Serve this folder with any static server or publish its root with GitHub Pages. No build dependencies are required. Run `node check.mjs` for random collections, complete non-repeating target sequences, scoring, timer, checkpoint validation, English/Chinese parity, and non-overlapping desktop/mobile placements.
