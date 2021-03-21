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
}
function createAudioElements() {
    var wrapper = document.querySelector("#audioWrapper");
    SOUNDS.forEach(function (sound) { return wrapper.appendChild(getAudioElement(sound)); });
}
function createControls() {
    var wrapper = document.querySelector("#controlsWrapper");
    SOUNDS.forEach(function (sound) {
        return wrapper.appendChild(getControlElement(sound));
    });
}
function getControlElement(_a) {
    var name = _a.name, src = _a.src, key = _a.key;
    var el = document.createElement("button");
    el.innerText = name;
    el.classList.add("control");
    return el;
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
