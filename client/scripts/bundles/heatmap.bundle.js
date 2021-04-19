var firebaseConfig = {
    apiKey: "AIzaSyBI1xMKhZzzEbOeq5NwKTu3bNJQzAQqM6U",
    authDomain: "airdash-eb4f7.firebaseapp.com",
    projectId: "airdash-eb4f7",
    storageBucket: "airdash-eb4f7.appspot.com",
    messagingSenderId: "115572624463",
    appId: "1:115572624463:web:9cbeec099147ee6b44ee3a",
    measurementId: "G-KTT3J57LNB"
};
window.firebase.initializeApp(firebaseConfig);
var db = window.firebase.firestore();
class Coordinate {
    constructor(lat, __long){
        this.lat = lat;
        this.long = __long;
    }
}
var coordinateConverter = {
    toFirestore: function(coordinate) {
        return {
            lat: coordinate.lat,
            long: coordinate.long
        };
    },
    fromFirestore: function(data) {
        return new Coordinate(data.lat, data.long);
    }
};
async function getCoordinates() {
    const data = [];
    await db.collection("testdata").get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            data.push(coordinateConverter.fromFirestore(doc.data()));
        });
    });
    return data;
}
let map;
function initMap() {
    var stockholm = new window.google.maps.LatLng(59.3293235, 18.0685808);
    getCoordinates().then((list)=>{
        map = new window.google.maps.Map(window.document.getElementById('map'), {
            center: stockholm,
            zoom: 11,
            mapTypeId: 'satellite'
        });
        var heatmap = new window.google.maps.visualization.HeatmapLayer({
            data: createHeatmap(list)
        });
        heatmap.setMap(map);
    });
}
function createHeatmap(list) {
    let heatmap_data = new Array();
    list.forEach((coordinate)=>heatmap_data.push(new window.google.maps.LatLng(coordinate.lat, coordinate.long))
    );
    return heatmap_data;
}