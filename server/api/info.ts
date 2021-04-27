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
import { MiddlewareFunc, HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { uploadCoordinates, Coordinate } from "./firebase.ts";

class ErrorHandler extends Error{
  status:number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const infoHandler: HandlerFunc = async (c: Context) => {
	try {
		let data: Coordinate;
		try {
			const body: any = await c.body;
			data = {
				lat: body.lat,
				long: body.long
			}
		} catch (error) {
			throw new ErrorHandler("Request body can not be empty!", 400);
		}
		await uploadCoordinates(data);
	} catch (error) {
		throw new ErrorHandler(error.message, error.status || 500)
	}
}
