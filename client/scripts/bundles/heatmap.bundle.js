const API = {
    Get: async function(endpoint) {
        const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
        const data = await response.json();
        return data;
    }
};
let map;
async function initMap() {
    const stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
    map = new window.google.maps.Map(window.document.getElementById('map'), {
        center: stockholm,
        zoom: 11,
        mapTypeId: 'satellite'
    });
    const HEATMAP_DATA = await API.Get('/data');
    if (HEATMAP_DATA != null) {
        const heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: createHeatmap(HEATMAP_DATA)
        });
        heatmap.setMap(map);
    } else console.log("No heatmap data available.");
}
function createHeatmap(data) {
    return data.map((c)=>{
        return {
            location: new window.google.maps.LatLng(c.lat, c.long),
            weight: 0.1
        };
    });
}
async function SearchLocation() {
    const query = window.document.getElementById('search-text').value;
    const result = await API.Get('/geosearch?query=' + query);
    if (result.data) {
        console.log(result.data);
        const first = result.data[0];
        if (first) {
            map.setCenter(new window.google.maps.LatLng(first.latitude, first.longitude));
            return;
        }
    }
    alert("Could not find location!");
}