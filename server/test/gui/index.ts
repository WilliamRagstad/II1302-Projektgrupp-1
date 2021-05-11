import { testIndexGui } from "./index-gui.ts";
import { testHeatmapGui } from "./heatmap-gui.ts";
import { testRecordingsGui } from "./recordings-gui.ts";

export function testGui() {
    testIndexGui();
    testHeatmapGui();
    testRecordingsGui();
}