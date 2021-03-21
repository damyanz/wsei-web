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
}

function createAudioElements(): void {
  const wrapper: HTMLDivElement = document.querySelector("#audioWrapper");
  SOUNDS.forEach((sound: Sound) => wrapper.appendChild(getAudioElement(sound)));
}

function createControls(): void {
  const wrapper: HTMLDivElement = document.querySelector("#controlsWrapper");
  SOUNDS.forEach((sound: Sound) =>
    wrapper.appendChild(getControlElement(sound))
  );
}

function getControlElement({ name, src, key }: Sound): HTMLButtonElement {
  const el = document.createElement("button");
  el.innerText = name;
  el.classList.add("control");
  return el;
}

function getAudioElement({ name, src, key }: Sound): HTMLAudioElement {
  const el = document.createElement("audio");
  el.src = `./assets/sounds/${src}`;
  el.dataset.name = name;
  el.dataset.key = key;
  return el;
}

initApp();
