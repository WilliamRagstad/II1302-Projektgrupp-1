import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { heatmapHandler } from "../api/heatmap.ts";

export function testHeatmap() {
	//Tests heatmapHandler by comparing the first coordinate in the list.
	Deno.test({
		name: "Firestore Client Get Test",
		async fn() {
			const HEATMAP_DATA = await heatmapHandler();
			assertEquals(HEATMAP_DATA[0], {
				"lat": 59.327,
				"long": 18.065,
			});
		},
	});

	//Tests the heatmap generator, not working due to Google Maps API not existing in this file.
	/*Deno.test("Heatmap Generator Test", async () => {
	  var bool = initMap();
	  assertEquals(bool, true);
	});*/
}