import { HeadlessBrowser } from "https://deno.land/x/sinco@v1.1.1/mod.ts";

export function testIndexGui() {
	//Test navigation to heatmap page.
	Deno.test({
		name: "Test heatmap navigation",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/");

			await Sinco.click('a[href="heatmap"]');
			await Sinco.waitForPageChange();
			await Sinco.assertUrlIs("https://airdash.herokuapp.com/heatmap");
			await Sinco.done();
		}
	})
	//Test navigation to recordings page.
	Deno.test({
		name: "Test recordings navigation",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/");

			await Sinco.click('a[href="recordings"]');
			await Sinco.waitForPageChange();
			await Sinco.assertUrlIs("https://airdash.herokuapp.com/recordings");
			await Sinco.done();
		}
	})
	//Test navigation to about us page.
	Deno.test({
		name: "Test about us navigation",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/");

			await Sinco.click('a[href="about"]');
			await Sinco.waitForPageChange();
			await Sinco.assertUrlIs("https://airdash.herokuapp.com/about");
			await Sinco.done();
		}
	})
}