var SOUNDS = [
    {
        name: "boom",
        src: "boom.wav",
        key: "q"
    },
    {
        name: "clap",
        src: "clap.wav",
        key: "w"
    },
    {
        name: "hihat",
        src: "hihat.wav",
        key: "e"
    },
    {
        name: "kick",
        src: "kick.wav",
        key: "r"
    },
    {
        name: "openhat",
        src: "openhat.wav",
        key: "c"
    },
    {
        name: "ride",
        src: "ride.wav",
        key: "n"
    },
    {
        name: "snare",
        src: "snare.wav",
        key: "u"
    },
    {
        name: "tink",
        src: "tink.wav",
        key: "i"
    },
    {
        name: "tom",
        src: "tom.wav",
        key: "o"
    },
];
var Track = /** @class */ (function () {
    function Track(wrapper) {
        this.memory = [];
        this.isRecording = false;
        this.isPlaying = false;
        this.isMuted = false;
        this.currentProgress = 0;
        this.create(wrapper);
    }
    Track.prototype.createTrackControls = function () {
        var _this = this;
        var controlsWrapper = document.createElement("div");
        controlsWrapper.classList.add("controlsWrapper");
        var muteIcon = document.createElement("span");
        muteIcon.classList.add("muteIcon");
        muteIcon.addEventListener("click", function () {
            if (!_this.isMuted) {
                muteIcon.classList.add("muteIcon--muted");
                _this.isMuted = true;
            }
            else {
                muteIcon.classList.remove("muteIcon--muted");
                _this.isMuted = false;
            }
        });
        var playButton = document.createElement("button");
        playButton.classList.add("button", "playButton");
        playButton.innerText = "ODTWORZ";
        playButton.addEventListener("click", function (e) {
            if (_this.memory.length > 0) {
                if (!_this.isPlaying && !_this.isMuted) {
                    _this.playRecording();
                }
            }
        });
        var recordButton = document.createElement("button");
        recordButton.classList.add("button", "recordButton");
        recordButton.innerText = "NAGRYWAJ";
        recordButton.addEventListener("click", function () {
            if (!_this.isRecording) {
                recordButton.classList.add("recordButton--recording");
                _this.startRecording();
            }
            else {
                recordButton.classList.remove("recordButton--recording");
                _this.stopRecording();
            }
        });
        controlsWrapper.appendChild(muteIcon);
        controlsWrapper.appendChild(recordButton);
        controlsWrapper.appendChild(playButton);
        return controlsWrapper;
    };
    Track.prototype.create = function (wrapper) {
        var trackWrapper = document.createElement("div");
        trackWrapper.classList.add("trackWrapper");
        var trackControls = this.createTrackControls();
        var el = document.createElement("div");
        el.classList.add("track");
        trackWrapper.appendChild(trackControls);
        trackWrapper.appendChild(el);
        wrapper.appendChild(trackWrapper);
        this.trackElement = el;
    };
    Track.prototype.clearMemory = function () {
        this.memory = [];
        this.duration = 0;
        this.recordingStartTimestamp = new Date().getTime();
    };
    Track.prototype.recordSound = function (audioElement) {
        var recordTimestamp = new Date().getTime();
        var soundData = {
            audioElement: audioElement,
            recordTime: recordTimestamp - this.recordingStartTimestamp
        };
        this.memory.push(soundData);
    };
    Track.prototype.startRecording = function () {
        this.clearMemory();
        this.isRecording = true;
    };
    Track.prototype.stopRecording = function () {
        var recordingEndTimestamp = new Date().getTime();
        this.duration = recordingEndTimestamp - this.recordingStartTimestamp;
        console.log(this.duration);
        this.isRecording = false;
    };
    Track.prototype.playRecording = function () {
        this.isPlaying = true;
        this.runTrackProgress();
        this.memory.forEach(function (soundData) {
            setTimeout(function () {
                playSound(soundData.audioElement);
            }, soundData.recordTime);
        });
    };
    Track.prototype.runTrackProgress = function () {
        var _this = this;
        var interval = 1000 / 60;
        var progressInterval = setInterval(function () {
            _this.currentProgress =
                _this.currentProgress + (interval / _this.duration) * 100;
            if (_this.currentProgress >= 100) {
                _this.currentProgress = 100;
                _this.isPlaying = false;
                _this.stopTrackProgress();
                clearInterval(progressInterval);
            }
            _this.trackElement.style.background = "linear-gradient(to right, red,  red " + _this.currentProgress + "%, gray " + _this.currentProgress + "%, gray 100%)";
        }, interval);
    };
    Track.prototype.stopTrackProgress = function () {
        var _this = this;
        setTimeout(function () {
            _this.trackElement.style.background = "";
            _this.currentProgress = 0;
        }, 500);
    };
    Track.prototype.removeRecording = function () {
        this.memory = [];
    };
    return Track;
}());
var tracks = [];
function initApp() {
    createAudioElements();
    createControls();
    createTracks();
    addKeyListener();
    handlePlayAllButton();
}
var AudioControls = {
    elements: {},
    controls: {}
};
function createTracks() {
    for (var i = 0; i < 4; i++) {
        var wrapper = document.querySelector("#tracksWrapper");
        var track = new Track(wrapper);
        tracks.push(track);
    }
}
function createAudioElements() {
    var wrapper = document.querySelector("#audioWrapper");
    SOUNDS.forEach(function (sound) {
        var audioEl = getAudioElement(sound);
        wrapper.appendChild(audioEl);
        AudioControls.elements[sound.key] = audioEl;
    });
}
function createControls() {
    var wrapper = document.querySelector("#controlsWrapper");
    SOUNDS.forEach(function (sound) {
        var controlElement = getControlElement(sound);
        wrapper.appendChild(controlElement);
        AudioControls.controls[sound.key] = controlElement;
    });
}
function addKeyListener() {
    document.addEventListener("keypress", handleKeyPress);
}
function handleKeyPress(e) {
    var key = e.key.toLowerCase();
    var element = AudioControls.elements[key];
    if (element) {
        playSound(element);
        simulateControlClick(key);
    }
}
function playSound(element) {
    element.currentTime = 0;
    element.play();
    recordSound(element);
}
function recordSound(audioElement) {
    tracks.forEach(function (track) {
        if (track.isRecording) {
            track.recordSound(audioElement);
        }
    });
}
function simulateControlClick(key) {
    var control = AudioControls.controls[key];
    control.classList.add("control--active");
    setTimeout(function () {
        control.classList.remove("control--active");
    }, 100);
}
function getControlElement(_a) {
    var name = _a.name, src = _a.src, key = _a.key;
    var el = document.createElement("button");
    var elLabel = "\n  <span class=\"audioKey\">" + key + "</span>\n  <span class=\"audioName\">" + name + "</span>\n  ";
    el.innerHTML = elLabel;
    el.classList.add("control");
    el.addEventListener("click", function () { return handleControlClick(key); });
    return el;
}
function handleControlClick(key) {
    playSound(AudioControls.elements[key]);
}
function getAudioElement(_a) {
    var name = _a.name, src = _a.src, key = _a.key;
    var el = document.createElement("audio");
    el.src = "./assets/sounds/" + src;
    el.dataset.name = name;
    el.dataset.key = key;
    return el;
}
function handlePlayAllButton() {
    var btn = document.querySelector("#playAll");
    btn.addEventListener("click", function () {
        tracks.forEach(function (track) {
            if (!track.isMuted && !track.isPlaying) {
                track.playRecording();
            }
        });
    });
}
initApp();
