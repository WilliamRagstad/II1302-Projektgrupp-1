const API = {
    Get: async function(endpoint) {
        const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
        const data = await response.json();
        return data;
    }
};
let map;
async function initMap() {
    var stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
    const HEATMAP_DATA = await API.Get('/data');
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
function createHeatmap(data) {
    return data.map((c)=>new window.google.maps.LatLng(c.lat, c.long)
    );
}