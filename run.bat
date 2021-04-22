@echo off
call bundle.bat
deno test --allow-net --allow-read server/test/tests.ts
deno run --allow-net --allow-read server/server.ts
