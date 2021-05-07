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
}
