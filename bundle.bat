@echo off
rem deno run --unstable --allow-read --allow-net --allow-write bundle.ts
deno bundle scripts/heatmap.ts scripts/bundles/heatmap.bundle.js

deno run --unstable --allow-read --allow-net --allow-write process-bundles.ts