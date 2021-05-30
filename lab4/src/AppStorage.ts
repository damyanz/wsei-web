import { Storage } from "./storage";

class AppStorage implements Storage {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  saveNotes(obj: any) {
    return localStorage.setItem(this.key, JSON.stringify(obj));
  }
  getNotes() {
    return JSON.parse(localStorage.getItem(this.key));
  }
}

export default AppStorage;
