class App {
  inputCount: number = 4;
  countInput: HTMLInputElement;
  countBtn: HTMLButtonElement;
  inputListWrapper: HTMLUListElement;
  inputs: HTMLInputElement[] = [];
  outputs: HTMLOutputElement[] = [];

  sumOutput: HTMLOutputElement;
  avgOutput: HTMLOutputElement;
  minOutput: HTMLOutputElement;
  maxOutput: HTMLOutputElement;

  constructor() {
    this.init();
  }
  init() {
    this.getControls();
    this.generateInputs();
  }
  popInputs(count: number) {
    for (let i: number = 0; i < -count; i++) {
      this.inputs.pop();
      this.inputListWrapper.lastChild.remove();
    }
  }
  pushInputs(count: number) {
    for (let i: number = 0; i < count; i++) {
      const inputElement: HTMLInputElement = this.createInput();
      const listItem: HTMLLIElement = document.createElement("li");
      listItem.appendChild(inputElement);
      this.inputListWrapper.appendChild(listItem);
      this.inputs.push(inputElement);
    }
  }
  generateInputs() {
    const generateCount: number = this.inputCount - this.inputs.length;
    if (generateCount < 0) {
      this.popInputs(generateCount);
    } else {
      this.pushInputs(generateCount);
    }
    this.initListeners();
    this.calculate();
  }
  createInput(): HTMLInputElement {
    const valueInput: HTMLInputElement = document.createElement("input");
    valueInput.type = "number";
    valueInput.value = "1";
    return valueInput;
  }
  getControls() {
    this.countInput = document.querySelector("#countInput");
    this.countBtn = document.querySelector("#countBtn");
    this.inputListWrapper = document.querySelector("#inputList");
    this.sumOutput = document.querySelector("#sum");
    this.avgOutput = document.querySelector("#avg");
    this.minOutput = document.querySelector("#min");
    this.maxOutput = document.querySelector("#max");
  }
  handleChange(e: InputEvent) {
    const target = <HTMLInputElement>e.target;
    const { value } = target;
    if (!this.isValueValid(value)) {
      target.value = "1";
    }
    this.calculate();
  }
  initListeners() {
    this.countBtn.addEventListener("click", () => this.setInputCount());
    this.inputs.forEach((input: HTMLInputElement) =>
      input.addEventListener("change", (e: InputEvent) => this.handleChange(e))
    );
  }
  getValues() {
    return this.inputs.map((input) => +input.value);
  }
  calculate() {
    const values: number[] = this.getValues();
    const sum: number = values.reduce((a: number, b: number) => a + b);
    const avg: number = sum / this.inputs.length;
    const min: number = Math.min(...values);
    const max: number = Math.max(...values);

    this.setResult(this.sumOutput, sum);
    this.setResult(this.avgOutput, avg);
    this.setResult(this.minOutput, min);
    this.setResult(this.maxOutput, max);
  }
  setInputCount() {
    if (!this.isValueValid(this.countInput.value)) {
      this.countInput.value = "1";
    }
    this.inputCount = +this.countInput.value;
    this.generateInputs();
  }
  setResult(output: HTMLOutputElement, result: number) {
    output.value = `${result}`;
  }
  isValueValid(value: String | number): boolean {
    const isValid = !isNaN(+value) && +value > 0;
    if (!isValid) {
      alert("Provided value is not a valid number!");
    }
    return isValid;
  }
}

const app = new App();
