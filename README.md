# vite-double-import-repro

This repo contains a reproduction of a bug in Vite: when `ssrLoadModule` fails, it only fails once per module. `npm install`, then `node index.js` to see the bug. Attempting to import `bad.js` a second time should fail the same way it does when you attempt to import it the first time.
