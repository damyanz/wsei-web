export enum Provider {
  LocalStorage = "localStorage",
  Firestore = "Firestore",
}

export interface Storage {
  key: string;
  saveNotes(obj: any): any;
  getNotes(): any;
}
