var App = /** @class */ (function () {
    function App() {
        this.init();
    }
    App.prototype.init = function () {
        this.getControls();
        this.initListeners();
        this.generateInputs();
    };
    App.prototype.generateInputs = function () {
        var inputListWrapper = document.querySelector("#inputList");
        inputListWrapper.innerHTML = "";
        for (var i = 0; i < this.inputCount; i++) {
            var listItem = document.createElement("li");
            listItem.appendChild(this.createInput());
            inputListWrapper.appendChild(listItem);
        }
        this.inputs = inputListWrapper.children;
    };
    App.prototype.createInput = function () {
        var valueInput = document.createElement("input");
        valueInput.type = "number";
        valueInput.value;
        return valueInput;
    };
    App.prototype.getControls = function () {
        this.countInput = document.querySelector("#countInput");
        this.countBtn = document.querySelector("#countBtn");
    };
    App.prototype.initListeners = function () {
        var _this = this;
        this.countBtn.addEventListener("click", function () { return _this.setInputCount(); });
    };
    App.prototype.setInputCount = function () {
        if (!this.isValueValid(this.countInput.value)) {
            alert("Provided value is not a valid number! Try again.");
            return;
        }
        this.inputCount = +this.countInput.value;
        this.generateInputs();
    };
    App.prototype.isValueValid = function (value) {
        return !isNaN(+value) && +value > 0;
    };
    return App;
}());
var app = new App();
//# sourceMappingURL=bundle.js.map