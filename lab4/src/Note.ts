import { htmlToElement, pinIconHMTL } from "./helper";
class Note {
  id: string;
  title: string;
  content: string;
  color: string;
  pinned: boolean = false;
  createdAt: Date;
  onRemove: (id: string) => any;
  onPin: (id: string) => any;

  constructor(
    title: string,
    content: string,
    color: string,
    onRemove: (id: string) => any,
    onPin: (id: string) => any,
    id?: string,
    pinned?: boolean,
    createdAt?: string
  ) {
    this.id = id || `note_${Math.random().toString(36).substr(2, 9)}`;
    this.title = title;
    this.content = content;
    this.color = color;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.pinned = !!pinned;
    this.onRemove = onRemove;
    this.onPin = onPin;
  }

  createRemoveButton(): HTMLButtonElement {
    const removeButton: HTMLButtonElement = document.createElement("button");
    removeButton.classList.add("removeButton");
    removeButton.innerText = "X";
    removeButton.addEventListener("click", () => {
      this.onRemove(this.id);
    });
    return removeButton;
  }

  createPinButton(): HTMLButtonElement {
    const pinButton: HTMLButtonElement = document.createElement("button");
    pinButton.classList.add("pinButton");
    if (this.pinned) {
      pinButton.classList.add("pinned");
    }
    pinButton.innerHTML = pinIconHMTL;
    pinButton.addEventListener("click", () => {
      this.onPin(this.id);
    });
    return pinButton;
  }

  createNoteElement(): HTMLDivElement {
    const removeButton = this.createRemoveButton();
    const pinButton = this.createPinButton();
    const contentElement = this.getContentElement();
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.id = this.id;
    noteElement.style.backgroundColor = this.color;
    noteElement.appendChild(removeButton);
    noteElement.appendChild(pinButton);
    noteElement.appendChild(contentElement);

    return noteElement;
  }

  getContentElement(): ChildNode {
    const { title, content, createdAt } = this;

    return htmlToElement(`
    <div>
        <h3 class="heading--note" title="${title}">
            ${title}
        </h3>
        <p class="content">
          ${content}
        </p>
        <div class="info">
          <span>Data utworzenia: ${createdAt.toLocaleString()}</span>
        </div>
      </div>`);
  }

  getNoteElement(): HTMLDivElement {
    return this.createNoteElement();
  }
}

export default Note;
