import { getFirestore, query, where, collection, getDocs } from "firebase/firestore"; 
import app from "../firebase-config";

export async function queryUserMaps( user ) {
    const db = getFirestore(app);
    const mapsRef = collection(db, "Maps");
    const mapsQuery = query(mapsRef, where("creator", "==", user.email));
    
    const mapsQuerySnapshot = await getDocs(mapsQuery);
    const results = mapsQuerySnapshot.docs;
    console.log('mapsQuerySnapshot')
    console.log(mapsQuerySnapshot)
    console.log('query results:');
    console.log(results);
    return results;
}