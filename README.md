# Raoul Letters Game

A small web game that helps young children learn the alphabet. The game says a letter out loud and the child taps the matching picture card. Correct and wrong answers each get their own spoken feedback.

It was made for Raoul in 2017.

## Features

- Picture cards and recorded pronunciation for every letter from A to Z
- A "which one?" challenge mode with random letters
- Encouraging audio feedback ("good job!")
- Works offline through an AppCache manifest
- Built with [yalla.js](https://github.com/yallajs) templates

## Running locally

It is a static site, so any static file server will work:

```bash
npx serve public
```

## Deploy

The game is hosted on Firebase:

```bash
firebase deploy
```
