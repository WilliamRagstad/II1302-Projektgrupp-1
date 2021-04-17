  var firebaseConfig = {
    apiKey: "AIzaSyBI1xMKhZzzEbOeq5NwKTu3bNJQzAQqM6U",
    authDomain: "airdash-eb4f7.firebaseapp.com",
    projectId: "airdash-eb4f7",
    storageBucket: "airdash-eb4f7.appspot.com",
    messagingSenderId: "115572624463",
    appId: "1:115572624463:web:9cbeec099147ee6b44ee3a",
    measurementId: "G-KTT3J57LNB"
  };
  // Initialize Firebase and firestore
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

class Coordinate {
  constructor (lat, long) {
    this.lat = lat;
    this.long = long;
  }
  toString() {
    return "new window.google.maps.LatLng("+this.lat+","+ this.long+")"
  }
};

//Converts Coordinate from JSON to an object and back.
var coordinateConverter = {
  toFirestore: function(coordinate) {
    return {
      lat: coordinate.lat,
      long: coordinate.long
    };
  },
  fromFirestore: function(data){
    return new Coordinate(data.lat, data.long, data.weight);
  }
};

//Retrieves all coordinates from Firestore in object form
function getCoordinates() {
  const data = [];
  db.collection("testdata").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc.data());
          data.push(coordinateConverter.fromFirestore(doc.data()))
        });
      });
  return data;
}

//Adds a list of coordinates to the firestore. Intended only for testing purposes.
function setCoordinates(list) {
  list.forEach(coord =>
    db.collection("testdata").add(coord)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    }))
}
