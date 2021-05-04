import { Firebase } from '../lib/firebaseClient.ts';
import { HandlerFunc, Context } from "https://deno.land/x/abc@v1.3.0/mod.ts";

/*
console.log(client);
console.log((await client.Firestore.GetPath('testdata/0Ss4dMvTDpRJGq2jGB6q')));

client.Firestore.UpdateDocumentFields('test/test', {
	inserted: {
		integerValue: 111
	}
});

console.log(await client.Firestore.CreateDocument('test', 'MyID2', {
	sampleData: {
		stringValue: "Hello!"
	}
}));
*/
// console.log(await client.Storage.Metadata('mac-1/cat.jpg'))
// console.log(client.Storage.GetLink('mac-1/cat.jpg'));


export interface Coordinate {
	lat: number;
	long: number;
}
//Uploads JSON data to firestore
export async function uploadCoordinates(data: Coordinate) {
	console.log(await Firebase.Firestore.CreateDocument('testhttp	', '', {
		lat: {
			doubleValue: data.lat
		},
		long: {
			doubleValue: data.long
		}
	}));
}

async function getCoordinates(maxCount: number): Promise<Coordinate[]> {
	const rawData = await Firebase.Firestore.GetPath('testdata', maxCount);
	if (rawData.documents == undefined || rawData.documents.length == 0) return await [];
	return rawData.documents.map((data: any): Coordinate => { return { lat: data.fields.lat.doubleValue, long: data.fields.long.doubleValue } })
}

async function getCoordinatesByTime(maxCount: number, fromdate: Date, todate: Date) {
	const rawData = await Firebase.Firestore.GetPath('testDate', maxCount);
	if (rawData.documents == undefined || rawData.documents.length == 0) return await [];
	var coordinates: Coordinate[] = [];
	rawData.documents.forEach( (data: any) => {
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