import { HeadlessBrowser } from "https://deno.land/x/sinco@v1.1.1/mod.ts";
import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

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
    //Tests that heatmap search location does not redirect to another page.
    Deno.test({
        name: "Test searchLocation page not redirected",
        async fn() {
            //Setup
            const Sinco = new HeadlessBrowser();
            await Sinco.build();
            await Sinco.goTo("https://airdash.herokuapp.com/heatmap");

            await Sinco.type('input[id="search-text"]', "hello world");
            await Sinco.click('button#searchlocation-btn');
            await Sinco.assertSee("Could not find location!");
            await Sinco.done();
        }
    });
}