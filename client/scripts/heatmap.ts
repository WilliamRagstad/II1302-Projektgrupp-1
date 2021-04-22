import { API } from './api.ts';

declare global {
	interface Window {
		document: any,
		google: any
	}
}

let map: any;

export async function initMap() {
	const stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
	map = new window.google.maps.Map(window.document.getElementById('map'), {
		center: stockholm,
		zoom: 11,
		mapTypeId: 'satellite'
	});

	const HEATMAP_DATA = await API.Get('/data'); //Awaits the promise before continuing and adding the data.
	if (HEATMAP_DATA != null) {
		const heatmap = new window.google.maps.visualization.HeatmapLayer({
			data: createHeatmap(HEATMAP_DATA)
		});
		heatmap.setMap(map);
	}
	else console.log("No heatmap data available.");
}

//Transforms the firestore data to heatmap data
function createHeatmap(data: any[]): any[] {
	return data.map(c => {
		return {
			location: new window.google.maps.LatLng(c.lat, c.long),
			weight: 1
		}
	})
}

export async function SearchLocation() {
	const query = window.document.getElementById('search-text').value;
	const result = await API.Get('/geosearch?query=' + query);
	if (result.data) {
		// console.log(result.data);
		const first = result.data[0];
		if (first) {
			map.setCenter(new window.google.maps.LatLng(first.latitude, first.longitude));
			return;
		}
	}
	alert("Could not find location!");
}

window.document.getElementById('search-text').addEventListener('keydown', (e: any) => e.key == 'Enter' && SearchLocation());