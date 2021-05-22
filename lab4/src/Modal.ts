class Modal {
  ref: HTMLElement;
  title: string;
  content: string;
  color: string;

  constructor() {
    this.ref = document.querySelector(".modal");
    this.addButtonListeners();
  }

  addButtonListeners() {
    const closeButton = document.querySelector(".modal .closeButton");
    closeButton.addEventListener("click", () => {
      this.hide();
    });
  }

  hide() {
    this.ref.parentElement.classList.add("hidden");
  }
  show() {
    this.ref.parentElement.classList.remove("hidden");
  }
}

export default Modal;
