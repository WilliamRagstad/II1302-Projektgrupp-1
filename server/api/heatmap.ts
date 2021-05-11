import { Firebase } from '../lib/firebaseClient.ts';
import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";
import { InfoResult } from "../lib/codec.ts";

/*****************************************************************************************************
 *
 * 	API Endpoint for Heatmap to download crash coordinate data.
 *
 * 	Read the Heatmap Protocol here:
 *  https://docs.google.com/document/d/1SCksR1ZiXcY1JKih0xlanwZ_goSRLAft9CjBOXBbfL4/edit#
 *
 * 	Author: William Axbrink
 * 	Created: 2021-05-03
 *
 *  Edited: William Rågstad
 *  Date: 2021-05-11
 *
 * ****************************************************************************************************
*/

export interface Coordinate {
	lat: number;
	long: number;
}

//Uploads JSON data to firestore
export async function uploadCoordinates(data: InfoResult) {
	console.log(await Firebase.Firestore.CreateDocument('testhttp', '', { // 'testdata'
		lat: {
			doubleValue: data.GPS.lat
		},
		long: {
			doubleValue: data.GPS.long
		},
		mac: {
			stringValue: data.MAC
		}
	}));
}

//Calls on Firebase Firestore to retrieve data from the collection 'testdata' with a maximum of maxCount nodes.
async function getCoordinates(maxCount: number): Promise<Coordinate[]> {
	const rawData = await Firebase.Firestore.GetPath('testdata', maxCount);
	if (rawData.documents == undefined || rawData.documents.length == 0) return await [];
	return rawData.documents.map((data: any): Coordinate => { return { lat: data.fields.lat.doubleValue, long: data.fields.long.doubleValue } })
}

//Calls on Firebase Firestore to retrieve data from the collection 'testdate' with a maximum of maxCount nodes and timestamps between fromdate and todate.
async function getCoordinatesByTime(maxCount: number, fromdate: Date, todate: Date) {
	const rawData = await Firebase.Firestore.GetPath('testDate', maxCount);
	if (rawData.documents == undefined || rawData.documents.length == 0) return await [];
	var coordinates: Coordinate[] = [];
	rawData.documents.forEach((data: any) => {
		if (new Date(data.fields.timestamp.timestampValue) >= fromdate && new Date(data.fields.timestamp.timestampValue) <= todate)
			coordinates.push({ lat: data.fields.lat.doubleValue, long: data.fields.long.doubleValue });
	});
	return coordinates;
}

export async function heatmapHandler() {
	return await getCoordinates(1000);
}

export async function heatmapByTimeHandler(c: Context) {
	const { from, to } = c.params as { from: string, to: string }
	const fromdate = new Date(from);
	const todate = new Date(to);
	return await getCoordinatesByTime(100, fromdate, todate);
}
