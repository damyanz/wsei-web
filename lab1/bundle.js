var App = /** @class */ (function () {
    function App() {
        this.inputCount = 4;
        this.inputs = [];
        this.outputs = [];
        this.init();
    }
    App.prototype.init = function () {
        this.getControls();
        this.generateInputs();
    };
    App.prototype.popInputs = function (count) {
        for (var i = 0; i < -count; i++) {
            this.inputs.pop();
            this.inputListWrapper.lastChild.remove();
        }
    };
    App.prototype.pushInputs = function (count) {
        for (var i = 0; i < count; i++) {
            var randomRef = Math.random();
            var inputElement = this.createInput();
            inputElement.dataset.ref = "input-" + randomRef;
            var removeButtonElement = this.createRemoveButton();
            var listItem = document.createElement("li");
            listItem.appendChild(inputElement);
            listItem.appendChild(removeButtonElement);
            this.inputListWrapper.appendChild(listItem);
            this.inputs.push(inputElement);
        }
    };
    App.prototype.generateInputs = function () {
        var generateCount = this.inputCount - this.inputs.length;
        if (generateCount < 0) {
            this.popInputs(generateCount);
        }
        else {
            this.pushInputs(generateCount);
        }
        this.initListeners();
        this.calculate();
    };
    App.prototype.createInput = function () {
        var valueInput = document.createElement("input");
        valueInput.type = "number";
        valueInput.value = "1";
        return valueInput;
    };
    App.prototype.createRemoveButton = function () {
        var _this = this;
        var removeButton = document.createElement("button");
        removeButton.innerHTML = "❌";
        removeButton.addEventListener("click", function (e) { return _this.handleRemoval(e); });
        return removeButton;
    };
    App.prototype.handleRemoval = function (e) {
        if (this.inputs.length === 1)
            return;
        var target = e.target;
        var siblingInput = target.previousSibling;
        var siblingRef = siblingInput.dataset.ref;
        var newInputs = this.inputs.filter(function (input) { return input.dataset.ref !== siblingRef; });
        this.inputs = newInputs;
        target.parentElement.remove();
        this.calculate();
    };
    App.prototype.getControls = function () {
        this.countInput = document.querySelector("#countInput");
        this.countBtn = document.querySelector("#countBtn");
        this.inputListWrapper = document.querySelector("#inputList");
        this.sumOutput = document.querySelector("#sum");
        this.avgOutput = document.querySelector("#avg");
        this.minOutput = document.querySelector("#min");
        this.maxOutput = document.querySelector("#max");
    };
    App.prototype.handleChange = function (e) {
        var target = e.target;
        var value = target.value;
        if (!this.isValueValid(value)) {
            target.value = "1";
        }
        this.calculate();
    };
    App.prototype.initListeners = function () {
        var _this = this;
        this.countBtn.addEventListener("click", function () { return _this.setInputCount(); });
        this.inputs.forEach(function (input) {
            return input.addEventListener("change", function (e) { return _this.handleChange(e); });
        });
    };
    App.prototype.getValues = function () {
        return this.inputs.map(function (input) { return +input.value; });
    };
    App.prototype.calculate = function () {
        var values = this.getValues();
        var sum = values.reduce(function (a, b) { return a + b; });
        var avg = sum / this.inputs.length;
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        this.setResult(this.sumOutput, sum);
        this.setResult(this.avgOutput, avg);
        this.setResult(this.minOutput, min);
        this.setResult(this.maxOutput, max);
    };
    App.prototype.setInputCount = function () {
        if (!this.isValueValid(this.countInput.value)) {
            this.countInput.value = "1";
        }
        this.inputCount = +this.countInput.value;
        this.generateInputs();
    };
    App.prototype.setResult = function (output, result) {
        output.value = "" + result;
    };
    App.prototype.isValueValid = function (value) {
        var isValid = !isNaN(+value) && +value > 0;
        if (!isValid) {
            alert("Provided value is not a valid number!");
        }
        return isValid;
    };
    return App;
}());
var app = new App();
