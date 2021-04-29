import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";

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