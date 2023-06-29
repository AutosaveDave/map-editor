import { getFirestore, doc, addDoc, collection, setDoc, Timestamp, updateDoc } from "firebase/firestore"; 
import app from "../firebase-config";

export async function addNewUser( data ) {

  const { email } = data;

  const db = getFirestore( app );

  const docData = {
    userId: email,
    email: email,
    maps: [],
    accountCreated: Timestamp.now(),
  };

  await setDoc( doc( collection( db, "Users" ) ), docData, {merge:false} )
    .then(() => {
        console.log("Document has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}

export async function createNewMap( data, name, descr ) {
  console.log(data);
  const email = data.user.email;

  const db = getFirestore( app );

  const mapData = {
    name: name,
    descr: descr,
    creator: email,
    createdOn: Timestamp.now(),
    lastEdited: Timestamp.now(),
    panels: [],
    mapConfig: {
      gridAxis: 0,
      gridValue: 0,
      tileSize: 1,
      mapDimensions: [20,20,10],
      wallThickness: 0.1,
      currentId: 0,
      groundColor: "#119944",
      currentColor: "#EE9900",
      colorPalette: [],
    },
    camera: {
      position: [-2,-2,10],
      angle: 1,
      swivel: 7,
      distance: 20,
      focus: [4,4,0],
      frustum: 16,
      zoom: 1,
    },
  };
  const result = await addDoc( collection( db, "Maps" ) , mapData )
    .then( (res) => res );
    
  return result;
}

export async function saveMap( data, mapRef, map ) {
  //const { email } = data.email;
  const mapData = {...map, lastEdited:Timestamp.now()};
  const db = getFirestore( app );

  const result = await updateDoc( doc( collection( db, "Maps" ), mapRef ), mapData )
    .then(()=>{return mapData});
  return result;
}