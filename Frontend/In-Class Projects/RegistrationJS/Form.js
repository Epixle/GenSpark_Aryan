document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");

    function validatePassword() {
        if (confirm.value !== password.value)
            confirm.setCustomValidity("Passwords do not match");
        else
            confirm.setCustomValidity("");
    }

    form.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function () {
            validatePassword();
            if (form.classList.contains("was-validated"))
                this.reportValidity();
        });
    });

    form.addEventListener("submit", function (event) {
        validatePassword();

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add("was-validated");
    });
});