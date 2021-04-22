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

export async function videoHandler(req: any) {
	console.log(req.url)

	return await "Ok";
}