import { HeadlessBrowser } from "https://deno.land/x/sinco@v1.1.1/mod.ts";
import { assertEquals } from "https://deno.land/std@0.92.0/testing/asserts.ts";

export function testRecordingsGui() {
	//Tests recordings table correctly shown.
	/*
    Deno.test({
		name: "Test recordings table correctly shown",
		async fn() {
			//Setup
			const Sinco = new HeadlessBrowser();
			await Sinco.build();
			await Sinco.goTo("https://airdash.herokuapp.com/recordings");

            const exists = await Sinco.evaluatePage(() => {
                return (document.body.innerText.indexOf("88:88:88:88") >= 0)
            })
			await Sinco.done();
            assertEquals(exists, true);
		}
	});
    */
}