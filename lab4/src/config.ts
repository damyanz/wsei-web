import { Provider } from "./storage";

type AppConfig = {
  storageProvider: Provider;
  storageKey: string;
};

export const config: AppConfig = {
  storageProvider: Provider.Firestore,
  storageKey: "notes",
};

export const firebaseConfig = {
  apiKey: "AIzaSyDQcslcTFie7zFw0297VHvcdEUL2TMS07s",
  authDomain: "wsei-web-notekeep.firebaseapp.com",
  projectId: "wsei-web-notekeep",
  storageBucket: "wsei-web-notekeep.appspot.com",
  messagingSenderId: "858430506940",
  appId: "1:858430506940:web:7a97c84c7a7a5b0145cdb9",
};
