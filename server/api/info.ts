/*****************************************************************************************************
 *
 * 	API Endpoint for Hardware to upload crash data.
 *
 * 	Read the API Protocol here:
 * 	https://docs.google.com/document/d/16eSfvjlGZJWVxUy715WonXewk2vtuB85cD9Ca-ypnDQ/edit?usp=sharing
 *
 * 	Author: William Rågstad
 * 	Created: 2021-04-22
 *
 * ****************************************************************************************************
*/

import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { ErrorHandler } from '../lib/errorHandler.ts';
import { Codec, CustomHeaders } from '../lib/codec.ts';
import { Firebase } from '../lib/firebaseClient.ts';

function instanceOfNetAddr(addr: Deno.Addr): addr is Deno.NetAddr { return 'hostname' in addr; }
function instanceOfUnixAddr(addr: Deno.UnixAddr): addr is Deno.UnixAddr { return 'path' in addr; }

function AddrToString(address: Deno.Addr) {
	if (instanceOfNetAddr(address)) return `${address.hostname}:${address.port}`;
	if (instanceOfUnixAddr(address)) return address.path;
	throw new Error("Address is not of type NetAddr nor UnixAddr!");

}

export const infoHandler: HandlerFunc = async (c: Context) => {
	// console.log(c);
	const localIP = c.request.conn.localAddr;
	const clientIP = c.request.conn.remoteAddr;
	console.log(`Local IP: ${AddrToString(localIP)}, Client IP: ${AddrToString(clientIP)}`);

	const request = await c.body;
	const content: string = typeof request == 'object' ? JSON.stringify(request) : '' + request;
	const headers: CustomHeaders = Codec.CustomHeaders(c);
	console.log(`Headers: ${JSON.stringify(headers)}`);

	console.log(`Request Body: ${content}`);

	const data = Codec.Info(headers);
	if (data.Succeeded) {
		console.log('Parsed', data.Result);

		try {
			console.log(await Firebase.Firestore.CreateDocument('data', '', {
				lat: {
					doubleValue: data.Result.GPS.lat
				},
				long: {
					doubleValue: data.Result.GPS.long
				},
				mac: {
					stringValue: data.Result.MAC
				}
			}));
			return "OK\nParsed: " + JSON.stringify(data.Result);
		} catch (error) {
			throw new ErrorHandler(error.message, error.status || 500);
		}
	}
	else throw new ErrorHandler(data.ErrorMessage, 400);
}

/*******************************
 *
 *  Test by sending a sample POST request to: http://localhost:8000/info
 *  With the text body: 3E0C2CA38FB4{ÈA#-31.212,5.6752
 *
 *  The response should be the following object:
 *  { Succeeded: true, Result: { MAC: "3E0C2CA38FB4", Accelerometer: 1949, GPS: { lat: -31.212, long: 5.6752}} }
 *
 *******************************/
