# Chokchai.T portfolio

React + TypeScript + Vite + Tailwind CSS v4. The existing design, copy, images and public page URLs are preserved.

## Development

```sh
npm ci
npm run dev
```

Open `/` for the welcome screen and `/profile.html` for the CV. Edit `web/src/Landing.tsx` and the section components in `web/src/components/`. Page-specific styles retain the original design; Tailwind utilities are available without a CSS reset.

## Build and publish

```sh
npm run build
npm test
```

The build generates `dist/` and synchronizes the two HTML entry points and bundled `assets/` into the repository root. Commit those generated files together with the source. Existing GitHub Pages **main / root** hosting continues to work without changing repository settings. All 90 original image files remain at the repository root, byte-for-byte unchanged, and are copied into `dist/` for preview. Never edit the generated root HTML directly.

`npm run preview` serves the production build. Test setup: `npx playwright install chromium`.

## Preserved behavior

- Welcome page and SweetAlert confirmation before opening `profile.html`.
- Dark/light theme stored under the existing `theme` localStorage key.
- Google Apps Script / Google Sheets tracking: same endpoint, `visitor_id` key, payload fields, event names and historical `profile_v2.html` label.
- One profile-view event per page mount; scroll and bottom-reached events fire once each. Requests use keepalive so the click event can survive page navigation.
- Mobile sidebar, section navigation, active navigation, reveal animations and automatic age calculation.
- All five project galleries, including Jaspal Rooms' 13 screenshots; image overlay with previous/next, keyboard arrows, Escape and backdrop dismissal.
- Binance BTCUSDT ticker refreshes every five seconds with the same price/change display.
- Existing font and icon CDN references remain. SweetAlert is now bundled by npm.

There was no encoding or encryption logic in the original pages to migrate. The AES text describes the Centric PLM project, not a feature of this portfolio.
