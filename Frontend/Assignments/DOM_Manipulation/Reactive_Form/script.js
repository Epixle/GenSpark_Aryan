const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const userOutput = document.querySelector("#userOutput");
const emailOutput = document.querySelector("#emailOutput");
const passwordOutput = document.querySelector("#passwordOutput");

const summary = document.querySelector("#summary");
const submit = document.querySelector("#submit");

let userValid = false;
let emailValid = false;
let passwordValid = false;

function update(input, valid) {
    input.classList.remove("error", "success");
    input.classList.add(valid ? "success" : "error");
}

username.addEventListener("input", () => {
    userValid = username.value.trim().length >= 3;
    userOutput.textContent = userValid ? "Looks good." : "Username must be at least 3 characters long";
    
    update(username, userValid);
    
    submit.disabled = !(userValid && emailValid && passwordValid);
    
    summary.textContent = "";
});

email.addEventListener("input", () => {
    const emailOut = email.value.trim()
    emailValid = emailOut !== "" && emailOut.includes("@") && emailOut.includes(".");
    emailOutput.textContent = emailValid ? "Looks good." : "Email must have an @ and .";
    
    update(email, emailValid);
    
    submit.disabled = !(userValid && emailValid && passwordValid);
    
    summary.textContent = "";
});

password.addEventListener("input", () => {
    const passwordOut = password.value.trim();
    passwordValid = passwordOut.length >= 8 && /\d/.test(passwordOut);
    passwordOutput.textContent = passwordValid ? "Looks good." : "Password must be at least 8 characters long and contain a number";

    update(password, passwordValid);
    
    submit.disabled = !(userValid && emailValid && passwordValid);
    
    summary.textContent = "";
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!(userValid && emailValid && passwordValid)) {
        summary.textContent = "Fix the errors before submitting.";
        return;
    }

    summary.textContent = "Form submitted successfully!";

    form.reset();
    submit.disabled = true;

    userValid = emailValid = passwordValid = false;

    userOutput.textContent = "";
    emailOutput.textContent = "";
    passwordOutput.textContent = "";

    username.classList.remove("error", "success");
    email.classList.remove("error", "success");
    password.classList.remove("error", "success");
});
