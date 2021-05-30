import { config } from "./config";
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
    this.notes = new Notes(
      config.storageProvider,
      config.storageKey,
      notesWrapper,
      pinnedWrapper
    );
    this.handleModal();
  }

  handleModal = async () => {
    this.modal = new Modal(this.notes.add);
    setTimeout(() => {
      if (!Object.keys(this.notes.notes).length) {
        this.modal.show();
      }
    }, 2000);
  };

  addModalToggler(): void {
    const addButton = document.querySelector("#add_note");
    addButton.addEventListener("click", () => {
      this.modal.show();
    });
  }
}

export default App;
