# Object Garden / 寻物小花园

A free, original visual search game with 30 familiar hand-drawn SVG objects. Each 60-second round randomly selects 24 distinct objects and arranges them in a stable collection. The prompt shows an object name and matching illustration; tap the correct object to earn 100 points and receive a different target. Targets can return later. Wrong taps give gentle feedback and keep the same target, with no extra score penalty. There are no lives or early failures.

English/Chinese, large text, touch/keyboard-accessible buttons, gentle synthesized sounds with a mute option, pause/resume, automatic pause on tab switch or window blur, saved unfinished rounds and highest completed score per local day. Replays use new random collections. Progress is local to the same browser and device; no login or backend. Pausing conceals the target and collection. The game has original art and implementation and is not affiliated with Peak.

Serve this folder with any static server, or publish its root with GitHub Pages. No build dependencies or external assets are required. Run `node check.mjs` for gameplay, timer, target generation, scoring, save validation and translation checks.
