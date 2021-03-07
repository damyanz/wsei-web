class App {
    inputCount: number;
    countInput: HTMLInputElement;
    countBtn: HTMLButtonElement;
    inputs: HTMLCollection;

    constructor(){
        this.init();
    }
    init(){
        this.getControls();
        this.initListeners();
        this.generateInputs();
    }
    generateInputs(){
        const inputListWrapper = document.querySelector("#inputList");
        inputListWrapper.innerHTML = "";
        for(let i = 0; i < this.inputCount; i++){
            const listItem: HTMLLIElement = document.createElement("li");
            listItem.appendChild(this.createInput());
            inputListWrapper.appendChild(listItem);
            
        }
        this.inputs = inputListWrapper.children;
    }
    createInput(): HTMLInputElement{
        const valueInput: HTMLInputElement = document.createElement("input");
        valueInput.type = "number";
        valueInput.value;
        return valueInput
    }
    getControls(){
        this.countInput = document.querySelector("#countInput");
        this.countBtn = document.querySelector("#countBtn");

    }
    initListeners(){
        this.countBtn.addEventListener("click", () => this.setInputCount())
    }
    setInputCount(){
        if(!this.isValueValid(this.countInput.value)){
            alert("Provided value is not a valid number! Try again.")
            return;
        }
        this.inputCount = +this.countInput.value;
        this.generateInputs()
    }
    isValueValid(value: String | Number): Boolean{
        return !isNaN(+value) && +value > 0
    }
}

const app = new App();