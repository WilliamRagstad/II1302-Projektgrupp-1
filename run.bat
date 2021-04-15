@echo off
call bundle.bat
deno run --allow-net --allow-read server.ts
