import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const db = firebase.firestore();

// class UserDataService {
//     getAll() {
//         return db;
//     }

//     create(user) {
//         return db.add(user)
//     }

//     update(id, value) {
//         return db.doc(id).update(value);
//     }

//     delete(id) {
//         return db.doc(id).delete();
//     }
// }

export default db;