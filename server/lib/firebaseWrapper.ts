import { createJWT, encodeUrl, getNumericDateJWT } from "./deps.ts";
import type { GoogleAuthToken, ServiceAccountKey } from "./types.ts";






class Client {
	token: string;
	baseUri: string;
	firestore: string;
	authDomain: string;
	storageBucket: string;

	constructor(token: string, projectId: string) {
		this.token = token;

		// https://firebase.google.com/docs/projects/learn-more#project-id
		this.baseUri = `https://${projectId}.firebaseio.com`;
		this.firestore = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/`;
		this.authDomain = `https://${projectId}.firebaseapp.com`;
		this.storageBucket = `https://${projectId}.appspot.com`;
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
		Request: async <K, T>(path: string, method: string, body?: T): Promise<K> => {
			const options: RequestInit = { method };
			if (typeof body !== "undefined") options.body = JSON.stringify(body);
			const res = await fetch(`${this.firestore}${path}`, options);
			return await res.json();
		},
		/**
		 * Get a document or collection.
		 * @param path Path to resource.
		 * @returns The result of the request.
		 */
		GetDocuments: (path: string) => this.Firestore.Request<any, undefined>("documents/" + path, 'GET'),
		/**
		 * Updated fields in a document.
		 * @param docPath The document path.
		 * @param updatedFields Optional fields to update. Values must follow this syntax specification: https://cloud.google.com/firestore/docs/reference/rest/v1beta1/Value.
		 * @returns The updated document.
		 */
		UpdateDocumentFields: (docPath: string, updatedFields: object) => this.Firestore.Request<any, object>("documents/" + docPath, 'PATCH', { fields: updatedFields })
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

const getClient = async (serviceAccountKey: ServiceAccountKey): Promise<Client> => {
	// Generate jwt and retrieve auth token
	console.log("Retrieving Google oAuth token...");
	const jwt: string = await createSignedJWT(serviceAccountKey);
	const token: GoogleAuthToken = await retrieveGoogleAuthToken(
		jwt,
		serviceAccountKey,
	);
	console.log("Done...");

	return new Client(token.access_token, serviceAccountKey.project_id);
};

export { Client, getClient };
