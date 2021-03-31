import { serve } from "https://deno.land/std@0.91.0/http/server.ts";

// Se dokumentation här:
// https://github.com/denoland/deno_std/tree/0.91.0/http

const server = serve({ port: 8000 });
console.log("Hosting on: http://localhost:8000/");

for await (const req of server) {
	req.respond({ body: "Hello World\n" });
}