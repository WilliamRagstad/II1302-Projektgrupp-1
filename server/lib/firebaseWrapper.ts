import { createJWT, encodeUrl, getNumericDateJWT } from "./deps.ts";
import type { GoogleAuthToken, ServiceAccountKey } from "./types.ts";


/******************************************
 * API Documentation for Firebase
 *
 * Firestore:
 * 	https://cloud.google.com/firestore/docs/reference/rest
 * 	https://firebase.google.com/docs/firestore/reference/rest
 * 	https://firebase.google.com/docs/firestore/use-rest-api
 *
 * Storage:
 * 	https://cloud.google.com/filestore/docs/reference/rest
 * 	https://cloud.google.com/storage/docs/json_api/v1
 * 	https://cloud.google.com/storage/docs/json_api/
 * 	https://firebase.google.com/docs/reference/rest/storage/rest
 *
 * REST Reference
 * 	https://firebase.google.com/docs/projects/api/reference/rest
 *
 * ----------------------------------------------------------------
 *
 * Project ID
 * 	https://firebase.google.com/docs/projects/learn-more#project-id
 *
 * Todo: ------------------------------------
 * 	Make rules for both Firestore and Storage to
 * 	require request.auth to be set to gain access
 * 	to read and allow writes to Firebase.
 *
 * 	This is a serious security risk right now
 * 	and should be fixed when/if shipped into
 * 	production in the future.
 *
*******************************************/
const FirestoreVersion = "v1";
const StorageVersion = "v0";


class FirebaseClient {
	token: string;
	baseUri: string;
	firestore: string;
	authDomain: string;
	storage: string;

	constructor(token: string, projectId: string) {
		this.token = token;

		// https://firebase.google.com/docs/projects/learn-more#project-id
		this.baseUri = `https://${projectId}.firebaseio.com`;
		this.firestore = `https://firestore.googleapis.com/${FirestoreVersion}/projects/${projectId}/databases/(default)/`;
		this.authDomain = `https://${projectId}.firebaseapp.com`;
		this.storage = `https://firebasestorage.googleapis.com/${StorageVersion}/b/${projectId}.appspot.com/`;
	}

	public Base = {
		BaseRequest: async <K, T>(path: string, method: string, body?: T): Promise<K> => {
			const options: RequestInit = {
				method,
			};

			if (typeof body !== "undefined") {
				options.body = JSON.stringify(body);
			}

			const finalUri = `${this.baseUri}${path}.json?access_token=${this.token}`;
			const res = await fetch(finalUri, options);
			const data = await res.json();

			return data;
		}
	}

	public Firestore = {
		/**
		 * Send a request to the Firestore API endpoint. This should not be used outside of this module.
		 * @param path .../databases/(default)/<path here>
		 * @param method HTTP method for the request.
		 * @param body HTTP body for the request.
		 * @returns Result of the request.
		 */
		Request: async (path: string, method: string, body?: Record<string, unknown>): Promise<any> => {
			const options: RequestInit = { method };
			if (body != undefined) options.body = JSON.stringify(body);
			const res = await fetch(`${this.firestore}${path}`, options);
			return await res.json();
		},
		/**
		 * Get a document or collection from path.
		 * @param path Path to resource.
		 * @returns The result of the request.
		 */
		GetPath: (path: string, count = 20, pageToken?: string) => this.Firestore.Request(`documents/${path}?pageSize=${count}${pageToken == undefined ? '' : `&pageToken=${pageToken}`}`, 'GET', undefined),
		/**
		 * Updated fields in a document.
		 * TODO: Fix rule for only allowing uploads from authenticated clients by using the token.
		 * @param docPath The document path.
		 * @param updatedFields Optional fields to update. Values must follow this syntax specification: https://cloud.google.com/firestore/docs/reference/rest/v1beta1/Value.
		 * @returns The updated document.
		 */
		UpdateDocumentFields: (docPath: string, updatedFields: Record<string, unknown>) => this.Firestore.Request("documents/" + docPath, 'PATCH', { fields: updatedFields }),
		/**
		 * Created a new document in a specific collection.
		 * TODO: Fix rule for only allowing uploads from authenticated clients by using the token.
		 * @param collectionPath Collection path in which to create the document.
		 * @param documentID Document ID.
		 * @param fields Optional pre-filled fields for the document.
		 * @returns The new document.
		 */
		CreateDocument: (collectionPath: string, documentID?: string, fields?: Record<string, unknown>) => this.Firestore.Request(`documents/${collectionPath}${documentID == undefined ? '' : `?documentId=${documentID}`}`, 'POST', fields && { fields: fields }),
		/**
		 *  Deletes a specific document in a specific collection.
		 * TODO: Fix rule for only allowing uploads from authenticated clients by using the token.
		 *  @param path Collection path and document ID to find document.
		 *  @returns {}
		 */
		DeleteDocument: (path: string) => this.Firestore.Request(`documents/${path}`, 'DELETE', undefined),

	}

	public Storage = {
		Request: (path: string, method: string, body?: BodyInit, headers?: HeadersInit, toJSON = true): Promise<any> => this.Storage.AbsoluteRequest(this.storage + path, method, body, headers, toJSON),
		AbsoluteRequest: async (path: string, method: string, body?: BodyInit, headers?: HeadersInit, toJSON = true): Promise<any> => {
			const options: RequestInit = { method };
			if (headers) options.headers = headers
			if (body) options.body = body;
			console.log(`Sending request to: ${this.storage}${path} with: ${JSON.stringify(options)}`)
			const res = await fetch(path, options);
			return toJSON ? await res.json() : res;
		},
		SerializeURI: (uri: string) => uri.replaceAll('/', '%2F'),
		Metadata: (objectPath: string) => this.Storage.Request(`o/${this.Storage.SerializeURI(objectPath)}`, 'GET'),
		GetLink: (objectPath: string) => `${this.storage}o/${this.Storage.SerializeURI(objectPath)}?alt=media`,
		Download: (objectPath: string) => this.Storage.AbsoluteRequest(this.Storage.GetLink(objectPath), 'GET', undefined, undefined, false),
		/**
		 * Upload a file to Firebase Storage.
		 * TODO: Fix rule for only allowing uploads from authenticated clients by using the token.
		 * @param objectFolder Folder to upload object to
		 * @param objectName Name of the object
		 * @param objectData File data
		 * @param dataMIME Data Mime type
		 * @returns Info about the newly created object
		 */
		Upload: (objectFolder: string, objectName: string, objectData: any, dataMIME = 'text/plain') => this.Storage.Request(`o/${this.Storage.SerializeURI(objectFolder + '/' + objectName)}`, 'POST', objectData, {
			'Content-Type': dataMIME
		} as HeadersInit)
	}
}










const createSignedJWT = async (
	serviceAccountKey: ServiceAccountKey,
): Promise<string> => {
	const iat = getNumericDateJWT(new Date());

	const jwt = await createJWT({
		alg: "RS256",
		typ: "JWT",
	}, {
		iss: serviceAccountKey.client_email,
		aud: serviceAccountKey.token_uri,
		scope: [
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/firebase.database",
		].join(" "),
		iat,
		exp: iat + 60 * 60,
	}, serviceAccountKey.private_key);

	return jwt;
};

const retrieveGoogleAuthToken = async (
	jwt: string,
	serviceAccountKey: ServiceAccountKey,
): Promise<GoogleAuthToken> => {
	const rawBody =
		`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`;
	const res = await fetch(serviceAccountKey.token_uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: encodeUrl(rawBody),
	});

	const data = await res.json();

	return data;
};

const getFirebaseClient = async (serviceAccountKey: ServiceAccountKey): Promise<FirebaseClient> => {
	// Generate jwt and retrieve auth token
	console.log("Retrieving Google oAuth token...");
	const jwt: string = await createSignedJWT(serviceAccountKey);
	const token: GoogleAuthToken = await retrieveGoogleAuthToken(
		jwt,
		serviceAccountKey,
	);
	console.log("Done! Generating Client...");

	return new FirebaseClient(token.access_token, serviceAccountKey.project_id);
};

export { getFirebaseClient };
