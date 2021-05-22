import Modal from "./Modal";
import Notes from "./Notes";
class App {
  modal: Modal;
  notes: Notes;

  constructor() {
    const notesWrapper: HTMLElement = document.querySelector(
      "#notes .notesWrapper"
    );
    const pinnedWrapper: HTMLElement = document.querySelector(
      "#pinned .notesWrapper"
    );

    this.addModalToggler();
    this.notes = new Notes(notesWrapper, pinnedWrapper);
    this.modal = new Modal(this.notes.add);
    this.modal.show();
  }

  addModalToggler() {
    const addButton = document.querySelector("#add_note");
    addButton.addEventListener("click", () => {
      this.modal.show();
    });
  }
}

export default App;
