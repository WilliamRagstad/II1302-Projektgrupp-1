import { getCoordinates } from './firebase.ts'

declare global {
	interface Window {
		document: any,
		google: any
	}
}

let map;

export function initMap() {
  var stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);

	//Awaits the promise before continuing and adding the data.
	getCoordinates().then(list => {
		map = new window.google.maps.Map(window.document.getElementById('map'), {
			center: stockholm,
			zoom: 11,
			mapTypeId: 'satellite'
		});

		var heatmap = new window.google.maps.visualization.HeatmapLayer({
			data: createHeatmap(list)
		});
		heatmap.setMap(map);
	})
}

//Transforms the firestore data to heatmap data
function createHeatmap(list:any[]) {
	let heatmap_data = new Array();
	list.forEach(coordinate=>
		heatmap_data.push(new window.google.maps.LatLng(coordinate.lat, coordinate.long))
	);
	return heatmap_data;
}
