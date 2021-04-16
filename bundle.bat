@echo off
rem Add all TypeScript files you want to be bundled here
deno bundle scripts/heatmap.ts scripts/bundles/heatmap.bundle.js

rem Do not touch this line plz
deno run --unstable --allow-read --allow-net --allow-write server/process-bundles.ts