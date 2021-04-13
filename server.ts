import { Application } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;
const HOST_PORT = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();

console.log("http://localhost:" + HOST_PORT + "/");

app
	.static("/", "pages")
	.get("/hello", () => {
		return "Hello, Abc!";
	})
	.start({ port: HOST_PORT });