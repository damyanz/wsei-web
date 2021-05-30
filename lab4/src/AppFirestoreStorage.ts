import firebase from "firebase";
import { firebaseConfig } from "./config";
import { Storage } from "./storage";
import Note from "./Note";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestoreDb = firebaseApp.firestore();

class AppFirestoreStorage implements Storage {
  notes: any[];
  key: string;
  collection: any;

  constructor(key: string) {
    this.key = key;
  }

  saveNotes = async (obj: any) => {
    const newNoteKeys = Object.keys(obj);
    Object.entries(this.notes).forEach(async ([key]: [string, Note]) => {
      if (!newNoteKeys.includes(key)) {
        this.removeNote(key);
      }
    });
    Object.entries(obj).forEach(async ([key, note]: [string, Note]) => {
      this.saveNote(note);
    });
  };

  getPlainNote = (note: Note) => {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      color: note.color,
      pinned: note.pinned,
      createdAt: firebase.firestore.Timestamp.fromDate(note.createdAt),
    };
  };

  saveNote = async (note: Note) => {
    await firestoreDb
      .collection(this.key)
      .doc(note.id)
      .set(this.getPlainNote(note));
  };

  removeNote = async (id: string) => {
    await firestoreDb.collection(this.key).doc(id).delete();
  };

  fetchNotes = async () => {
    let notes: any = {};
    const collectionData = await firestoreDb.collection(this.key).get();
    collectionData.forEach(async (doc) => {
      const noteData = doc.data();
      notes = {
        ...notes,
        [doc.id]: { ...noteData, createdAt: noteData.createdAt.toDate() },
      };
    });

    this.notes = notes;
  };

  getNotes = async () => {
    await this.fetchNotes();
    return this.notes;
  };
}

export default AppFirestoreStorage;
