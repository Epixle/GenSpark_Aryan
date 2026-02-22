const body = document.body;
const preview = document.querySelector("#preview");
const detail = document.querySelector("#detail");
const statusText = document.querySelector("#statusText");

const dark = document.querySelector("#dark");
const decrease = document.querySelector("#decrease");
const increase = document.querySelector("#increase");
const highlight = document.querySelector("#highlight");
const details = document.querySelector("#details");
const reset = document.querySelector("#reset");

let fontSize = 16;

function updateStatus() {
    const dark = body.classList.contains("dark") ? "On" : "Off";
    const highlight = preview.classList.contains("highlight") ? "Active" : "Off";
    const visible = detail.classList.contains("hidden") ? "Hidden" : "Visible";

    statusText.textContent = `Dark Mode: ${dark} -------------- Font Size: ${fontSize}px ------------- Highlight: ${highlight} --- Details: ${visible}`;
}

dark.addEventListener("click", () => {
    body.classList.toggle("dark");
    updateStatus();
});

decrease.addEventListener("click", () => {
    fontSize -= 2;
    preview.style.fontSize = fontSize + "px";
    updateStatus();
});

increase.addEventListener("click", () => {
    fontSize += 2;
    preview.style.fontSize = fontSize + "px";
    updateStatus();
});

highlight.addEventListener("click", () => {
    preview.classList.toggle("highlight");
    updateStatus();
});

details.addEventListener("click", () => {
    detail.classList.toggle("hidden");
    updateStatus();
});

reset.addEventListener("click", () => {
    body.classList.remove("dark");
    preview.classList.remove("highlight");
    detail.classList.remove("hidden");

    fontSize = 16;
    preview.style.fontSize = fontSize + "px";

    updateStatus();
});

updateStatus();