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
        key: "t"
    },
    {
        name: "ride",
        src: "ride.wav",
        key: "y"
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
function initApp() {
    createAudioElements();
    createControls();
    addKeyListener();
}
var AudioControls = {
    elements: {},
    controls: {}
};
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
initApp();
