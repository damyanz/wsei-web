import { Provider } from "./storage";
import Note from "./Note";
import AppStorage from "./AppStorage";
import AppFirestoreStorage from "./AppFirestoreStorage";
class Notes {
  notes: { [id: string]: Note } = {};
  wrapper: HTMLElement;
  pinnedWrapper: HTMLElement;
  storage: AppStorage;

  constructor(
    storageProvider: Provider,
    storageKey: string,
    wrapper: HTMLElement,
    pinnedWrapper: HTMLElement
  ) {
    this.wrapper = wrapper;
    this.pinnedWrapper = pinnedWrapper;

    switch (storageProvider) {
      case Provider.Firestore:
        this.storage = new AppFirestoreStorage(storageKey);
        break;
      case Provider.LocalStorage:
        this.storage = new AppStorage(storageKey);
        break;
    }

    this.restoreNotes();
    this.remove = this.remove.bind(this);
  }

  restoreNotes = async () => {
    const notes: any = await this.storage.getNotes();
    if (notes) {
      Object.entries(notes).forEach(([_id, note]: any) => {
        const { id, title, content, color, pinned, createdAt } = note;
        this.add(title, content, color, id, pinned, createdAt);
      });
    }
  };

  add = (
    title: string,
    content: string,
    color: string = "#ffffff",
    id?: string,
    pinned?: boolean,
    createdAt?: string
  ): void => {
    const newNote: Note = new Note(
      title,
      content,
      color,
      this.remove,
      this.togglePin,
      id,
      pinned,
      createdAt
    );
    this.notes = { ...this.notes, [newNote.id]: newNote };
    this.renderNotes();
  };

  togglePin = (id: string): void => {
    const noteRef = this.notes[id];
    noteRef.pinned = !noteRef.pinned;
    this.renderNotes();
  };

  remove = (id: string): void => {
    const { [id]: removed, ...restNotes } = this.notes;
    this.notes = restNotes;
    this.renderNotes();
  };

  renderNotes(): void {
    this.wrapper.innerHTML = "";
    this.pinnedWrapper.innerHTML = "";

    Object.entries(this.notes)
      .sort(([_a, a], [_b, b]) => b.createdAt.getTime() - a.createdAt.getTime())
      .forEach(([key, note]) => {
        if (note.pinned) {
          this.pinnedWrapper.appendChild(note.getNoteElement());
        } else {
          this.wrapper.appendChild(note.getNoteElement());
        }
      });

    this.storage.saveNotes(this.notes);
  }
}

export default Notes;
