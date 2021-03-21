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

const AudioControls = {};

function createAudioElements(): void {
  const wrapper: HTMLDivElement = document.querySelector("#audioWrapper");
  SOUNDS.forEach((sound: Sound) => {
    const audioEl = getAudioElement(sound);
    wrapper.appendChild(audioEl);
    AudioControls[sound.key] = audioEl;
  });
  console.log(AudioControls);
}

function createControls(): void {
  const wrapper: HTMLDivElement = document.querySelector("#controlsWrapper");
  SOUNDS.forEach((sound: Sound) =>
    wrapper.appendChild(getControlElement(sound))
  );
}

function addKeyListener(): void {
  document.addEventListener("keypress", handleKeyPress);
}

function handleKeyPress(e: KeyboardEvent): void {
  AudioControls[e.key].play();
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
