import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";

/**
 *? Is this test really necessary?
 * Deno probably has their own unit tests
 * before shipping the functionality for
 * testing into production.
 */

export function testDeno() {
	//Tests the Deno.test function
	Deno.test({
		name: "Deno.test module",
		fn() {
			const x = 1 + 2;
			assertEquals(x, 3);
		},
	});
}