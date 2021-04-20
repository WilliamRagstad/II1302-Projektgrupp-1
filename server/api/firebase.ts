import { Codec } from "../../shared/codec.ts";

/*
import firebase from 'https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js';

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
  var db =firebase.firestore();

class Coordinate {
  lat:number;
  long:number;
  constructor (lat:number, long:number) {
    this.lat = lat;
    this.long = long;
  }
};

//Converts Coordinate from JSON to an object and back.
var coordinateConverter = {
  toFirestore: function(coordinate:Coordinate) {
    return {
      lat: coordinate.lat,
      long: coordinate.long
    };
  },
  fromFirestore: function(data:any){
    return new Coordinate(data.lat, data.long);
  }
};

//Adds a list of coordinates to the firestore. Intended only for testing purposes.
function setCoordinates(list:any[]):void {
  list.forEach(coord =>
    db.collection("testdata").add(coord)
    .then((docRef:any) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error:any) => {
      console.error("Error adding document: ", error);
    }))
}

//Retrieves all coordinates from Firestore in object form
async function getCoordinates(){
  const data:any[] = [];
  await db.collection("testdata").get().then((querySnapshot:any) => {
      querySnapshot.forEach((doc:any) => {
          data.push(coordinateConverter.fromFirestore(doc.data()))
        });
      });
  return data;
}
*/
export function firebaseHandler() {
	return [
		{lat: 59.3345, long: 18.0723},
		{lat: 59.3346, long: 18.0722}
	]
	//return await getCoordinates();
}
