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
import { Codec } from '../lib/codec.ts';

export const videoHandler: HandlerFunc = async (c: Context) => {
	// console.log(c);
	const request = await c.body;
	const content = typeof request == 'object' ? JSON.stringify(request) : '' + request;
	console.log(`Request Body (${typeof request}): ${content}`);

	const data = Codec.Video(content);
	if (data.Succeeded) {
		console.log('Parsed', data.Result);
		console.log(`Uploading ${data.Result.MAC}.txt...`);

		const uploadResult = await Firebase.Storage.Upload('mac-1', data.Result.MAC + '.txt', data.Result.Data);
		console.log('Upload result', uploadResult);

		try {
			return "OK\nParsed: " + JSON.stringify(data.Result);
		} catch (error) {
			throw new ErrorHandler(error.message, error.status || 500);
		}
	}
	else throw new ErrorHandler(data.ErrorMessage, 400);
}


export async function videoByIDHandler(c: Context) {
	const { macaddress } = c.params as { macaddress: string }


	return await getVideos(macaddress);
}

async function getVideos(macaddress:any) {
	const rawData = await Firebase.Storage.List("mac-1");
	var videoURL: any[] = [];

	rawData.items.forEach(async (item:any) =>
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
