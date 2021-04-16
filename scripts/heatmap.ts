import { HEATMAP_DATA } from '../tests/wdata.ts';

declare global {
	interface Window {
		document: any,
		google: any
	}
}

let map;

export function initMap() {
  var stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);

  map = new window.google.maps.Map(window.document.getElementById('map'), {
    center: stockholm,
    zoom: 11,
    mapTypeId: 'satellite'
  });

  var heatmap = new window.google.maps.visualization.HeatmapLayer({
    data: HEATMAP_DATA()
  });
  heatmap.setMap(map);
}
