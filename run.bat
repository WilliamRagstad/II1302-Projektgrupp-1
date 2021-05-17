@echo off
call bundle.bat
call test.bat
deno run --allow-net --allow-read --allow-write --allow-run server/server.ts
