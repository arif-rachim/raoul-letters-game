# Raoul Letters Game

Raoul Letters Game is a small browser game, made in December 2017 for a young child named Raoul, that teaches the letters of the alphabet by sound and picture. Each round plays a recorded voice saying a letter and shows four picture cards, one for the spoken letter and three random others, and the child taps the card that matches. A right answer raises the score and plays encouraging "good job" clips at certain streaks, and a wrong answer plays a "not right" clip and lowers the score. It is a single static page with no build step: the UI is written with the author's yalla.js tagged-template library (loaded from unpkg), the score is kept in `localStorage`, an AppCache manifest lists every image and audio file so the game can run offline, and it was set up for Firebase Hosting. It is a finished personal project and is not actively maintained.

> Status: personal project from 2017, not actively maintained. The Firebase Hosting site is no longer online.

## Features

- Picture cards (`a.jpg` to `z.jpg`) and a recorded pronunciation (`a.mp3` to `z.mp3`) for every letter from A to Z.
- "Which one?" challenge: each round shows four different letters in random order, and the letter is repeated when the child taps the ear icon.
- Scoring: +2 per correct answer while the score is under 20, +1 after that; -1 for a wrong answer (never below 0). A wrong answer also resets the streak.
- Spoken praise at streak milestones (every 3rd correct answer, the 5th, the 7th and every 10th), then the next round starts automatically.
- Score and streak persist in `localStorage`, with a reset button that asks for confirmation.
- Offline support through `cache.appcache` (AppCache is deprecated and ignored by current browsers).

## Tech stack

HTML · JavaScript (ES2015, with a transpiled ES5 copy) · [yalla.js](https://github.com/arif-rachim/yalla) · animate.css · Google Fonts (Gochi Hand, Lato) · Firebase Hosting

## Getting started

There is nothing to install or build; `public/` is the whole site. Serve it with any static file server:

```bash
npx serve public
```

Deploy to Firebase Hosting (project `raoul-letters-game` in `.firebaserc`, serving `public/`):

```bash
firebase deploy
```

`index.html` loads `app.es5.js`, a transpiled copy of `app.js`. The repo has no script that produces it, so after editing `app.js` you need to transpile it yourself (for example with Babel) and bump the version comment in `cache.appcache` so cached clients pick up the change.

## Project structure

```text
public/
  index.html        Page shell: fonts, animate.css, yalla.js from unpkg, app.es5.js
  app.js            Game logic and templates (source)
  app.es5.js        Transpiled ES5 build of app.js that the page actually loads
  cache.appcache    AppCache manifest listing every asset
  assets/           Letter pictures, UI images (play, ear, reset, border, header)
  assets/audio/     Letter recordings and feedback clips
firebase.json       Hosting config (public directory)
.firebaserc         Default Firebase project
```
