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
    key: "c",
  },
  {
    name: "ride",
    src: "ride.wav",
    key: "n",
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

interface SoundData {
  audioElement: HTMLAudioElement;
  recordTime: number;
}
class Track {
  memory: SoundData[] = [];
  duration: number;
  recordingStartTimestamp: number;
  isRecording: boolean = false;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  currentProgress: number = 0;
  trackElement: HTMLDivElement;

  constructor(wrapper: HTMLDivElement) {
    this.create(wrapper);
  }
  createTrackControls(): HTMLDivElement {
    const controlsWrapper: HTMLDivElement = document.createElement("div");
    controlsWrapper.classList.add("controlsWrapper");

    const muteIcon: HTMLSpanElement = document.createElement("span");
    muteIcon.classList.add("muteIcon");
    muteIcon.addEventListener("click", () => {
      if (!this.isMuted) {
        muteIcon.classList.add("muteIcon--muted");
        this.isMuted = true;
      } else {
        muteIcon.classList.remove("muteIcon--muted");
        this.isMuted = false;
      }
    });

    const playButton: HTMLButtonElement = document.createElement("button");
    playButton.classList.add("button", "playButton");
    playButton.innerText = "ODTWORZ";
    playButton.addEventListener("click", (e) => {
      if (this.memory.length > 0) {
        if (!this.isPlaying && !this.isMuted) {
          this.playRecording();
        }
      }
    });

    const recordButton: HTMLButtonElement = document.createElement("button");
    recordButton.classList.add("button", "recordButton");
    recordButton.innerText = "NAGRYWAJ";
    recordButton.addEventListener("click", () => {
      if (!this.isRecording) {
        recordButton.classList.add("recordButton--recording");
        this.startRecording();
      } else {
        recordButton.classList.remove("recordButton--recording");
        this.stopRecording();
      }
    });

    controlsWrapper.appendChild(muteIcon);
    controlsWrapper.appendChild(recordButton);
    controlsWrapper.appendChild(playButton);

    return controlsWrapper;
  }
  create(wrapper: HTMLDivElement) {
    const trackWrapper: HTMLDivElement = document.createElement("div");
    trackWrapper.classList.add("trackWrapper");
    const trackControls: HTMLDivElement = this.createTrackControls();
    const el: HTMLDivElement = document.createElement("div");
    el.classList.add("track");
    trackWrapper.appendChild(trackControls);
    trackWrapper.appendChild(el);
    wrapper.appendChild(trackWrapper);
    this.trackElement = el;
  }
  clearMemory(): void {
    this.memory = [];
    this.duration = 0;
    this.recordingStartTimestamp = new Date().getTime();
  }
  recordSound(audioElement: HTMLAudioElement): void {
    const recordTimestamp: number = new Date().getTime();
    const soundData = {
      audioElement,
      recordTime: recordTimestamp - this.recordingStartTimestamp,
    };
    this.memory.push(soundData);
  }
  startRecording(): void {
    this.clearMemory();
    this.isRecording = true;
  }
  stopRecording(): void {
    const recordingEndTimestamp = new Date().getTime();
    this.duration = recordingEndTimestamp - this.recordingStartTimestamp;
    console.log(this.duration);
    this.isRecording = false;
  }
  playRecording(): void {
    this.isPlaying = true;
    this.runTrackProgress();
    this.memory.forEach((soundData: SoundData) => {
      setTimeout(() => {
        playSound(soundData.audioElement);
      }, soundData.recordTime);
    });
  }
  runTrackProgress(): void {
    const interval: number = 1000 / 60;
    const progressInterval = setInterval(() => {
      this.currentProgress =
        this.currentProgress + (interval / this.duration) * 100;
      if (this.currentProgress >= 100) {
        this.currentProgress = 100;
        this.isPlaying = false;
        this.stopTrackProgress();
        clearInterval(progressInterval);
      }
      this.trackElement.style.background = `linear-gradient(to right, red,  red ${this.currentProgress}%, gray ${this.currentProgress}%, gray 100%)`;
    }, interval);
  }
  stopTrackProgress(): void {
    setTimeout(() => {
      this.trackElement.style.background = "";
      this.currentProgress = 0;
    }, 500);
  }
  removeRecording(): void {
    this.memory = [];
  }
}

const tracks: Track[] = [];

function initApp() {
  createAudioElements();
  createControls();
  createTracks();
  addKeyListener();
  handlePlayAllButton();
}

const AudioControls = {
  elements: {},
  controls: {},
};

function createTracks(): void {
  for (let i = 0; i < 4; i++) {
    const wrapper: HTMLDivElement = document.querySelector("#tracksWrapper");
    const track: Track = new Track(wrapper);
    tracks.push(track);
  }
}

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
  const element: HTMLAudioElement = AudioControls.elements[key];
  if (element) {
    playSound(element);
    simulateControlClick(key);
  }
}

function playSound(element: HTMLAudioElement): void {
  element.currentTime = 0;
  element.play();
  recordSound(element);
}

function recordSound(audioElement: HTMLAudioElement): void {
  tracks.forEach((track) => {
    if (track.isRecording) {
      track.recordSound(audioElement);
    }
  });
}

function simulateControlClick(key: string): void {
  const control: HTMLButtonElement = AudioControls.controls[key];
  control.classList.add("control--active");
  setTimeout(() => {
    control.classList.remove("control--active");
  }, 100);
}

function getControlElement({ name, src, key }: Sound): HTMLButtonElement {
  const el: HTMLButtonElement = document.createElement("button");
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
  const el: HTMLAudioElement = document.createElement("audio");
  el.src = `./assets/sounds/${src}`;
  el.dataset.name = name;
  el.dataset.key = key;
  return el;
}

function handlePlayAllButton(): void {
  const btn: HTMLButtonElement = document.querySelector("#playAll");
  btn.addEventListener("click", () => {
    tracks.forEach((track: Track) => {
      if (!track.isMuted && !track.isPlaying) {
        track.playRecording();
      }
    });
  });
}

initApp();
