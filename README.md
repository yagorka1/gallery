# Photo Library

A single-page photo library built with Angular. Browse an infinite stream of
random photos, save the ones you like to **Favorites**, and open any favorite
in a full-screen detail view. Favorites are persisted locally and survive a
page refresh.

## Features

- **Photos (`/`)** — infinite scrollable grid of random photos. Clicking a
  photo adds it to favorites. New photos load on scroll with a loading
  indicator.
- **Favorites (`/favorites`)** — a list of all saved photos. Persisted in
  `localStorage`, so it survives page reloads. Clicking a photo opens its
  detail page.
- **Photo detail (`/photos/:id`)** — a single full-screen photo with a
  **Remove from favorites** button.

## Tech stack

- **Angular 17.3**
- **TypeScript**, **RxJS**
- **Angular Material**
- **SCSS**
- **Jasmine + Karma** for unit tests

## Getting started

### Prerequisites

- Node.js 18.13+
- npm 8+

### Install

```bash
npm install
```

### Run locally

```bash
npm start
```

The app will be available at `http://localhost:4200/`.

### Run unit tests

```bash
npm test
```

### Production build

```bash
npm run build
```

## Project structure

```
src/app/
├── core/          
├── layout/      
└── features/  
```
