import { testDeno } from "./deno.ts";
import { testHeatmap } from "./heatmap.ts";
import { testFirebase } from "./firebase.ts";
import { testEndpoints } from "./endpoints.ts";
import { testCodec } from "./codec.ts";

testDeno();
testHeatmap();
testFirebase();
testEndpoints();
testCodec();
