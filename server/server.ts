import { Application } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { heatmapHandler, heatmapByTimeHandler } from './api/heatmap.ts';
import { searchGeoHandler } from "./api/geosearch.ts";
import { videoHandler, videoByIDHandler } from "./api/video.ts";
import { infoHandler } from "./api/info.ts";

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;
const HOST_PORT = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();
console.log(HOST_PORT == 8000 ? "http://localhost:" + HOST_PORT + "/" : "https://airdash.herokuapp.com/");

// Using Abc library: https://doc.deno.land/https/deno.land/x/abc/mod.ts
// Library repository: https://github.com/zhmushan/abc
app
	.static("/scripts/", "client/scripts")
	.static("/style/", "client/style")
	.static("/assets/", "client/assets")
	.file("/", "client/pages/index.html")
	.file("/about", "client/pages/about.html")
	.file("/heatmap", "client/pages/heatmap.html")
	.file("/recordings", "client/pages/recordings.html")
	.file("/:404", "client/pages/index.html")
	.get("/data", heatmapHandler)
	.get("/data/:from/:to", heatmapByTimeHandler)
	.get("/geo", searchGeoHandler)
	.get("/video/:mac", videoByIDHandler)
	.post("/info", infoHandler)
	.post("/video", videoHandler)
	.start({ port: HOST_PORT });
