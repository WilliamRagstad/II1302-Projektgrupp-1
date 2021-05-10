import { HeadlessBrowser } from "https://deno.land/x/sinco@v1.1.1/mod.ts";

export function testHeatmapGui() {
	//Tests navigation to index page.
	Deno.test({
		name: "Test index navigation",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/heatmap");

			await Sinco.click('a[href="/"]');
			await Sinco.waitForPageChange();
			await Sinco.assertUrlIs("https://airdash.herokuapp.com/");
			await Sinco.done();
		}
	})
}