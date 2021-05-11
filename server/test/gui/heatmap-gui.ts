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
	});
	//Tests searchlocation not reloading page.
	Deno.test({
		name: "Test searchlocation not reloading page",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/heatmap");

			await Sinco.type('input#search-text', "stockholm");
			await Sinco.click('button#searchlocation-btn');
			await Sinco.assertUrlIs("https://airdash.herokuapp.com/heatmap");
			await Sinco.done();
		}
	});
	//Tests searchdate not reloading page.
	Deno.test({
		name: "Test searchdate not reloading page",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/heatmap");

			await Sinco.type('input#from', "2021-04-01");
			await Sinco.type('input#to', "2021-05-01");
			await Sinco.click('button#searchlocation-btn');
			await Sinco.assertUrlIs("https://airdash.herokuapp.com/heatmap");
			await Sinco.done();
		}
	});
}