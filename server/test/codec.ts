import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Codec } from "../lib/codec.ts";

export function testCodec(){
  //Testing the Codec Info function.
  Deno.test({
		name: "Codec Info Test",
		fn() {
      var data = Codec.Info("3E0C2CA38FB4{ÈA#59.334,18.063");
      assertEquals(data, { Succeeded: true, Result: { MAC: "3E0C2CA38FB4", Accelerometer: 1949, GPS: { lat: 59.334, long: 18.063}} })
		},
	});

  //Testing the Codec Video function.
  Deno.test({
    name: "Codec Video Test",
    fn() {
      var data = Codec.Video("3E0C2CA38FB4_*@^a1<+?3");
      assertEquals(data, { Succeeded: true, Result: { MAC: "3E0C2CA38FB4", Data: "_*@^a1<+?3" } })
    },
  });
}
