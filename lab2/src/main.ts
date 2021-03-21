interface Sound {
  name: string;
  src: string;
  key: string;
}

const SOUNDS: Sound[] = [
  {
    name: "boom",
    src: "boom.wav",
    key: "q",
  },
  {
    name: "clap",
    src: "clap.wav",
    key: "w",
  },
  {
    name: "hihat",
    src: "hihat.wav",
    key: "e",
  },
  {
    name: "kick",
    src: "kick.wav",
    key: "r",
  },
  {
    name: "openhat",
    src: "openhat.wav",
    key: "t",
  },
  {
    name: "ride",
    src: "ride.wav",
    key: "y",
  },
  {
    name: "snare",
    src: "snare.wav",
    key: "u",
  },
  {
    name: "tink",
    src: "tink.wav",
    key: "i",
  },
  {
    name: "tom",
    src: "tom.wav",
    key: "o",
  },
];

function initApp() {
  createAudioElements();
  createControls();
  addKeyListener();
}

const AudioControls = {
  elements: {},
  controls: {},
};

function createAudioElements(): void {
  const wrapper: HTMLDivElement = document.querySelector("#audioWrapper");
  SOUNDS.forEach((sound: Sound) => {
    const audioEl: HTMLAudioElement = getAudioElement(sound);
    wrapper.appendChild(audioEl);
    AudioControls.elements[sound.key] = audioEl;
  });
}

function createControls(): void {
  const wrapper: HTMLDivElement = document.querySelector("#controlsWrapper");
  SOUNDS.forEach((sound: Sound) => {
    const controlElement: HTMLButtonElement = getControlElement(sound);
    wrapper.appendChild(controlElement);
    AudioControls.controls[sound.key] = controlElement;
  });
}

function addKeyListener(): void {
  document.addEventListener("keypress", handleKeyPress);
}

function handleKeyPress(e: KeyboardEvent): void {
  const key: string = e.key.toLowerCase();
  const element = AudioControls.elements[key];
  if (element) {
    playSound(element);
    simulateControlClick(key);
  }
}

function playSound(element: HTMLAudioElement): void {
  element.currentTime = 0;
  element.play();
}

function simulateControlClick(key: string): void {
  const control: HTMLButtonElement = AudioControls.controls[key];
  control.classList.add("control--active");
  setTimeout(() => {
    control.classList.remove("control--active");
  }, 100);
}

function getControlElement({ name, src, key }: Sound): HTMLButtonElement {
  const el = document.createElement("button");
  const elLabel = `
  <span class="audioKey">${key}</span>
  <span class="audioName">${name}</span>
  `;
  el.innerHTML = elLabel;
  el.classList.add("control");
  el.addEventListener("click", () => handleControlClick(key));
  return el;
}

function handleControlClick(key: string): void {
  playSound(AudioControls.elements[key]);
}

function getAudioElement({ name, src, key }: Sound): HTMLAudioElement {
  const el = document.createElement("audio");
  el.src = `./assets/sounds/${src}`;
  el.dataset.name = name;
  el.dataset.key = key;
  return el;
}

initApp();
