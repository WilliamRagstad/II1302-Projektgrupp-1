import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Firebase } from '../lib/firebaseClient.ts';

export function testFirebase() {
	//Tests the Get function for the Firestore, retrieving test data.
	Deno.test({
		name: "Firestore Client Get Test",
		async fn() {
			const rawData = await Firebase.Firestore.GetPath("test", 1);
			assertEquals(rawData.documents[0].fields.sampleData.stringValue, "Hello!");
		},
	});

	//Tests the SerializeURI function.
	Deno.test({
		name: "Firestorage Client SerializeURI Test",
		fn() {
			var path = Firebase.Storage.SerializeURI("mac-1/cat.jpg");
			assertEquals(path, "mac-1%2Fcat.jpg");
		},
	});

	//Tests the Firebase Storage Get Metadata function by retrieving the metadata of an test object and comparing its name.
	Deno.test({
		name: "Firestorage Client Get Metadata Test",
		async fn() {
			var rawData = await Firebase.Storage.Metadata("mac-1/cat.jpg");
			assertEquals(rawData.name, "mac-1/cat.jpg");
		},
	});

	//Tests the Firebase Storage Get URL with the same test object.
	Deno.test({
		name: "Firestorage Client Get URL Test",
		fn() {
			var url = Firebase.Storage.GetLink("mac-1/cat.jpg");
			assertEquals(
				url,
				"https://firebasestorage.googleapis.com/v0/b/airdash-eb4f7.appspot.com/o/mac-1%2Fcat.jpg?alt=media",
			);
		},
	});

	//Tests the Firebase CreateDocument function and DeleteDocument function.
	Deno.test({
		name: "Firestore CreateDocument",
		async fn() {
			var response = await Firebase.Firestore.CreateDocument(
				"CreateDocumentTest",
				"test",
				{
					lat: {
						doubleValue: 15.5,
					},
					long: {
						doubleValue: 13.5,
					},
				},
			);
			assertEquals(response.fields.lat.doubleValue, 15.5);
			assertEquals(response.fields.long.doubleValue, 13.5);

			//Removes the test file
			var del = await Firebase.Firestore.DeleteDocument("CreateDocumentTest/test");
			assertEquals(del, {});
		},
	});
}