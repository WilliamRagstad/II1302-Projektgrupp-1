@echo off
rem Add all TypeScript files you want to be bundled here
deno bundle client/scripts/heatmap.ts client/scripts/bundles/heatmap.bundle.js
deno bundle client/scripts/recordings.ts client/scripts/bundles/recordings.bundle.js

rem Do not touch this line plz
deno run --unstable --allow-read --allow-net --allow-write server/process-bundles.ts
