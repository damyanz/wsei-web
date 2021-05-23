class Modal {
  ref: HTMLElement;
  form: HTMLFormElement;
  title: string;
  content: string;
  color: string;
  onSave: (title: string, content: string, color: string) => any;

  constructor(onSave: (title: string, content: string, color: string) => any) {
    this.ref = document.querySelector(".modal");
    this.getFormElement();
    this.addButtonListener();
    this.onSave = onSave;
  }

  addButtonListener(): void {
    const closeButton = document.querySelector(".modal .closeButton");
    closeButton.addEventListener("click", () => {
      this.hide();
    });
  }

  getFormElement = (): void => {
    this.form = document.querySelector("#note_form");
    this.form.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this.handleAdd();
    });
  };

  resetValues(): void {
    this.form.reset();
    this.title = "";
    this.content = "";
    this.color = "";
  }

  getFormValues(): { title: string; content: string; color: string } {
    const data = new FormData(this.form);
    const title = data.get("note_title") as string;
    const content = data.get("note_content") as string;
    const color = data.get("note_color") as string;
    return { title, content, color };
  }

  saveValues(): void {
    const { title, content, color } = this.getFormValues();
    if (!title.length || !content.length) {
      alert("Tytuł oraz treść notatki nie mogą być puste!");
      return;
    }
    this.title = title;
    this.content = content;
    this.color = color;
  }

  handleAdd(): void {
    this.saveValues();
    if (this.title && this.content) {
      this.onSave(this.title, this.content, this.color);
      this.hide();
    }
  }

  hide(): void {
    this.ref.parentElement.classList.add("hidden");
  }
  show(): void {
    this.resetValues();
    this.ref.parentElement.classList.remove("hidden");
  }
}

export default Modal;
