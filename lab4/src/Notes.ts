import Note from "./Note";

class Notes {
  notes: { [id: string]: Note } = {};
  wrapper: HTMLElement;
  pinnedWrapper: HTMLElement;

  constructor(wrapper: HTMLElement, pinnedWrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.pinnedWrapper = pinnedWrapper;
    this.remove = this.remove.bind(this);
  }

  add = (title: string, content: string, color: string = "#ffffff") => {
    const newNote: Note = new Note(
      title,
      content,
      color,
      this.remove,
      this.togglePin
    );
    this.notes = { ...this.notes, [newNote.id]: newNote };
    this.renderNotes();
  };

  togglePin = (id: string) => {
    const noteRef = this.notes[id];
    noteRef.pinned = !noteRef.pinned;
    this.renderNotes();
  };

  remove = (id: string) => {
    const { [id]: removed, ...restNotes } = this.notes;
    this.notes = restNotes;
    this.renderNotes();
  };

  renderNotes() {
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
  }
}

export default Notes;
