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
    this.modal = new Modal();
    this.notes = new Notes(notesWrapper, pinnedWrapper);
    this.notes.add("Testowy tytuł", "Testowa treść", "#FDE68A");
  }

  addModalToggler() {
    const addButton = document.querySelector("#add_note");
    console.log(addButton);
    addButton.addEventListener("click", () => {
      this.modal.show();
    });
  }
}

export default App;
