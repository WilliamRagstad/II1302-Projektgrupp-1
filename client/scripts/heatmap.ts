declare global {
	interface Window {
		document: any,
		google: any
	}
}

let map;

export async function initMap() {
  var stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
	const response = await fetch('/data')
	const HEATMAP_DATA = await response.json();
	//Awaits the promise before continuing and adding the data.

		map = new window.google.maps.Map(window.document.getElementById('map'), {
			center: stockholm,
			zoom: 11,
			mapTypeId: 'satellite'
		});

		var heatmap = new window.google.maps.visualization.HeatmapLayer({
			data: createHeatmap(HEATMAP_DATA)
		});
		heatmap.setMap(map);
}

//Transforms the firestore data to heatmap data
function createHeatmap(list:any[]) {
	let heatmap_data = new Array();
	list.forEach(coordinate=>
		heatmap_data.push(new window.google.maps.LatLng(coordinate.lat, coordinate.long))
	);
	return heatmap_data;
}
