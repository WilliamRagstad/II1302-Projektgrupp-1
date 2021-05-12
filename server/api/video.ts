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

const frmt = 24;
const denoDir = decodeURI(new URL('.', import.meta.url).pathname).replace('/', '');
const convert = denoDir + "convert_tmp/";
const ffmpeg = denoDir + "../lib/video/ffmpeg.exe";

function randomID(): string {
	return Math.random().toString(36).slice(2);
}

function fileExtension(mime: string): string {
	switch (mime) {
		case 'image/png': return '.png';
		case 'video/mp4': return '.mp4';
		case 'video/h264': return '.h264';
		case 'audio/mpeg': return '.mpeg';
		default: return '.unknown.txt';
	}
}

export const videoHandler: HandlerFunc = async (c: Context) => {
	// Reading raw bytes-method taken from:
	// * https://doc.deno.land/builtin/stable#Deno.readAll
	// * https://doc.deno.land/https/deno.land/x/abc@v1.3.1/vendor/https/deno.land/std/http/server.ts#ServerRequest

	const fileBuffer: Uint8Array = await Deno.readAll(c.request.body);
	// console.log(`Request Body (${typeof request}): ${content}`);

	const headers: CustomHeaders = Codec.CustomHeaders(c);
	const data = Codec.Video(fileBuffer, headers);
	const mime = c.request.headers.get('Content-Type');
	if (mime == null) throw new ErrorHandler("Expected Content-Type header", 400);
	const fileExt = fileExtension(mime);
	if (data.Succeeded) {
		console.log(`Parsed: ${mime} size: ${fileBuffer.length}`);

		let upload;
		const fileID = randomID();
		if (mime === 'video/h264') {
			// Convert to MP4
			const inFile = fileID + fileExt;
			const inFilePath = convert + inFile;
			const outFile = fileID + '.mp4';
			const outFilePath = convert + outFile;

			console.log('> Found h264 raw movie! Writing file to disk...');
			Deno.writeFileSync(inFilePath, fileBuffer);
			// Deno.sleepSync(100); // Wait for file to completely transfer.

			console.log('> Converting', inFile, 'to', outFile);
			const convertCommand = [ffmpeg, "-framerate", '' + frmt, "-i", inFilePath, outFilePath];
			// console.log(...convertCommand);

			const p = Deno.run({ cmd: convertCommand });
			const { code } = await p.status();
			if (code !== 0) {
				const errorMessage = "> Failed to convert h264 file to mp4!";
				console.log(errorMessage);
				throw new ErrorHandler(errorMessage, 500);
			}
			console.log('> Successfully Converted h264 file to mp4!');
			const convertedFile = await Deno.open(outFilePath);
			const convertedFileBuffer: Uint8Array = await Deno.readAll(convertedFile);

			try {
				upload = await Firebase.Storage.Upload(data.Result.MAC, outFile, convertedFileBuffer, 'video/mp4');
			} catch (error) {
				throw new ErrorHandler(error.message, error.status || 500);
			}

			console.log("> Cleaning up temporary files...");
			Deno.removeSync(inFilePath);
			Deno.removeSync(outFilePath);
		}
		else {
			try {
				upload = await Firebase.Storage.Upload(data.Result.MAC, fileID + fileExt, fileBuffer, mime);
			} catch (error) {
				throw new ErrorHandler(error.message, error.status || 500);
			}
		}
		console.log(upload);
		return `OK\nParsed ${mime}: ${upload.name}`;
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
