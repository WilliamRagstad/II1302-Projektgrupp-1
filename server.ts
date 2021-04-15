import { Application } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;
const HOST_PORT = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();

console.log("http://localhost:" + HOST_PORT + "/");

// Using Abc library: https://doc.deno.land/https/deno.land/x/abc/mod.ts
// Library repository: https://github.com/zhmushan/abc
app
	.static("/", "pages")
	.static("/scripts/", "scripts")
	.static("/style/", "style")
	.file("/", "pages/index.html")
	.get("/hello", () => {
		return "Hello World";
	})
	.start({ port: HOST_PORT });
