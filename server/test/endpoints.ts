import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";

export function testEndpoints() {
	//Testing /info with correct format.
	Deno.test({
		name: "API Endpoint POST /info Success",
		async fn() {
			const postRequest = await fetch("https://airdash.herokuapp.com/info", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					lat: {
						doubleValue: 59.297,
					},
					long: {
						doubleValue: 18.005,
					},
				}),
			});
			assertEquals(postRequest.status, 200);
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
}