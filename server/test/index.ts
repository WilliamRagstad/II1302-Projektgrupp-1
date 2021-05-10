import { testHeatmap } from "./heatmap.ts";
import { testFirebase } from "./firebase.ts";
import { testEndpoints } from "./endpoints.ts";
import { testCodec } from "./codec.ts";
import { testGui } from "./gui/index.ts";

testHeatmap();
testFirebase();
testEndpoints();
testCodec();
testGui();
