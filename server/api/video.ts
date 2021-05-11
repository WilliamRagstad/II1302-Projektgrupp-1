/*****************************************************************************************************
 *
 * 	API Endpoint for Hardware to upload video files.
 *
 * 	Read the API Protocol here:
 * 	https://docs.google.com/document/d/16eSfvjlGZJWVxUy715WonXewk2vtuB85cD9Ca-ypnDQ/edit?usp=sharing
 *
 * 	Author: William Rågstad
 * 	Created: 2021-04-22
 *
 * ****************************************************************************************************
*/

import { Firebase } from '../lib/firebaseClient.ts';
import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { ErrorHandler } from '../lib/errorHandler.ts';
import { Codec, CustomHeaders } from '../lib/codec.ts';

function randomID(): string {
	return Math.random().toString(36).slice(2);
}

function fileExtension(mime: string): string {
	switch (mime) {
		case 'image/png': return '.png';
		case 'video/mp4': return '.mp4';
		default: return '.unknown.txt';
	}
}

export const videoHandler: HandlerFunc = async (c: Context) => {
	// console.log(c);
	const request = await c.body;
	const file = typeof request == 'object' ? JSON.stringify(request) : '' + request;
	// console.log(`Request Body (${typeof request}): ${content}`);

	const headers: CustomHeaders = Codec.CustomHeaders(c);
	const data = Codec.Video(file, headers);
	const mime = c.request.headers.get('Content-Type');
	if (mime == null) throw new ErrorHandler("Expected Content-Type header", 400);
	const fileExt = fileExtension(mime);
	if (data.Succeeded) {
		console.log(`Parsed: ${mime}`);

		try {
			console.log(await Firebase.Storage.Upload(data.Result.MAC, randomID() + fileExt, data.Result.Data, mime));
			return "OK\nParsed: " + mime;
		} catch (error) {
			throw new ErrorHandler(error.message, error.status || 500);
		}
	}
	else throw new ErrorHandler(data.ErrorMessage, 400);
}


export async function videoByIDHandler(c: Context) {
	const { mac } = c.params as { mac: string }
	return await getVideos(mac);
}

async function getVideos(mac: any) {
	const rawData = await Firebase.Storage.List(mac);
	var videoURL: any[] = [];
	rawData.items.forEach(async (item: any) =>
		videoURL.push(await Firebase.Storage.GetLink(item.name))
	)

	return await videoURL;
}


/*******************************
 *
 *  Test by sending a sample POST request to: http://localhost:8000/video
 *  With the text body: 3E0C2CA38FB4_*@^a1<+?3
 *
 *  The response should be the following object:
 *  { Succeeded: true, Result: { MAC: "3E0C2CA38FB4", Data: "_*@^a1<+?3" } }
 *
 *******************************/
