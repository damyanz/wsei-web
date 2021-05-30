import firebase from "firebase";
import { firebaseConfig } from "./config";
import { Storage } from "./storage";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestoreDb = firebaseApp.firestore();

class AppFirestoreStorage implements Storage {
  key: string;
  collection: any;

  constructor(key: string) {
    this.key = key;
  }

  saveNotes(obj: any) {
    return localStorage.setItem(this.key, JSON.stringify(obj));
  }

  getNotes = async () => {
    let notes: any = {};
    const collectionData = await firestoreDb.collection(this.key).get();
    collectionData.forEach(async (doc) => {
      const noteData = doc.data();
      notes = {
        ...notes,
        [doc.id]: { ...noteData, createdAt: noteData.createdAt.toMillis() },
      };
    });

    return notes;
  };
}

export default AppFirestoreStorage;
