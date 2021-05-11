import { assertEquals, assertStringIncludes } from "https://deno.land/std@0.94.0/testing/asserts.ts";

export function testEndpoints() {
	//Testing /info with correct format.
	Deno.test({
		name: "API Endpoint POST /info Success",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/info", {
				method: "POST",
				headers: {
					"X-MAC": "12345",
					"X-Accelerometer": "12",
					"X-LAT": "-32",
					"X-LNG": "52.1"
				}
			});
			// assertEquals(postRequest.status, 200);
			const response = await postRequest.text();
			assertStringIncludes(response, `OK`);
		},
		sanitizeResources: false,
		sanitizeOps: false,
	});

	//Testing /info endpoint with empty format.
	Deno.test({
		name: "API Endpoint POST /info Failure",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/info", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});
			assertEquals(postRequest.status, 500);
		},
		sanitizeResources: false,
		sanitizeOps: false,
	});

	//Testing /data endpoint.
	Deno.test({
		name: "API Endpoint GET /data",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/data", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});
			assertEquals(postRequest.status, 200);
		},
		sanitizeResources: false,
		sanitizeOps: false,
	});

	//Testing /data endpoint with date inputs.
	Deno.test({
		name: "API Endpoint GET /data date inputs",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/data/2021-05-01/2021-05-05", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				}
			});
			assertEquals(postRequest.status, 200);
		},
		sanitizeResources: false,
		sanitizeOps: false,
	});

	//Testing /geo endpoint.
	Deno.test({
		name: "API Endpoint GET /geo",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/geo?query=vasastan", {
				method: "GET",
			});
			assertEquals(postRequest.status, 200);
		},
		sanitizeResources: false,
		sanitizeOps: false,
	});

	//Testing /video/:mac endpoint.
	Deno.test({
		name: "API Endpoint GET /video/:mac",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/video/mac-1", {
				method: "GET",
			});
			assertEquals(postRequest.status, 200);
		},
		sanitizeResources: false,
		sanitizeOps: false,
	});
}
