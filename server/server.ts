import { Application } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { firebaseHandler } from './api/firebase.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;
const HOST_PORT = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();
console.log("http://localhost:" + HOST_PORT + "/");

// Using Abc library: https://doc.deno.land/https/deno.land/x/abc/mod.ts
// Library repository: https://github.com/zhmushan/abc
app
	.static("/scripts/", "client/scripts")
	.static("/style/", "client/style")
	.file("/", "client/pages/index.html")
	.file("/contact", "client/pages/contact.html")
	.file("/heatmap", "client/pages/heatmap.html")
	.get("/hello", () => {
		return "Hello World";
	})
	.get("/data", firebaseHandler)
	.start({ port: HOST_PORT });