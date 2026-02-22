let currentInput = "";
let num1 = null;
let operator = null;

const display = document.getElementById("answer");

document.querySelectorAll("button").forEach(button => {
    const value = button.innerText;

    if (!isNaN(value) || value === ".")
        button.addEventListener("click", () => appendNumber(value));

    if (value === "=")
        button.addEventListener("click", calculate);

    if (value === "CE")
        reset();
});

function appendNumber(num) {
    currentInput += num;
    display.innerText = currentInput;
}

function setOp(op) {
    if (currentInput === "")
        return;

    num1 = Number(currentInput);
    operator = op;
    currentInput = "";
}

function calculate() {
    if (num1 === null || currentInput === "")
        return;

    let num2 = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                display.innerText = "Cannot divide by 0!";
                reset();
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }

    display.innerText = result;
    reset(result);
}

function reset(result = null) {
    currentInput = result !== null ? result.toString() : "";
    num1 = null;
    operator = null;
}

function clearEntry() {
    currentInput = "";
    num1 = null;
    operator = null;
    display.innerText = "0";
}