@echo off
call bundle.bat
call test.bat
deno run --allow-net --allow-read server/server.ts
