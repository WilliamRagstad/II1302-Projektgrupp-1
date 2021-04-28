const API = {
    Get: async function(endpoint) {
        const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
        try {
            return await response.json();
        } catch (error) {
            return await response.text();
        }
    }
};
let map;
let heatmap;
async function initMap() {
    const stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
    map = new window.google.maps.Map(window.document.getElementById('map'), {
        center: stockholm,
        zoom: 11,
        mapTypeId: 'satellite'
    });
    const HEATMAP_DATA = await API.Get('/data');
    if (HEATMAP_DATA != null) {
        heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: createHeatmap(HEATMAP_DATA)
        });
        heatmap.setMap(map);
    } else console.log("No heatmap data available.");
}
function createHeatmap(data) {
    return data.map((c)=>{
        return {
            location: new window.google.maps.LatLng(c.lat, c.long),
            weight: 1
        };
    });
}
async function SearchLocation() {
    var query = window.document.getElementById('search-text').value;
    if (query == "") {
        query = "Gamla Stan";
    }
    const result = await API.Get('/geo?query=' + query);
    if (result.data) {
        const first = result.data[0];
        if (first) {
            map.setCenter(new window.google.maps.LatLng(first.latitude, first.longitude));
            return;
        }
    }
    alert("Could not find location!");
}
window.document.getElementById('search-text').addEventListener('keydown', (e)=>e.key == 'Enter' && SearchLocation()
);
async function SearchDate() {
    if (window.document.getElementById('from').value == "" || window.document.getElementById('to').value == "") {
        alert("Need input in both date pickers");
        return;
    }
    var fromdate = new Date(window.document.getElementById('from').value);
    var todate = new Date(window.document.getElementById('to').value);
    if (fromdate > todate) {
        alert("invalid dates");
        return;
    }
    const path = '/data/' + formatDate(fromdate) + '/' + formatDate(todate);
    const result = await API.Get(path);
    if (result != null) {
        heatmap.setData(createHeatmap(result));
        return;
    }
    alert("Could not find any heatmapdata!");
}
function formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}