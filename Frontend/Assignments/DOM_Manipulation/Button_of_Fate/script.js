const display = document.getElementById("display");
const valueEl = document.getElementById("value");
const prophecy = document.getElementById("prophecy");

const blessing = document.getElementById("blessing");
const curse = document.getElementById("curse");
const reveal = document.getElementById("reveal");
const reset = document.getElementById("reset");

let fate = 0;

function updateMeter() {
    valueEl.textContent = fate;

    display.classList.remove("good", "bad");

    if (fate >= 50) {
        display.textContent = "Fate favors you.";
        display.classList.add("good");
    }

    if (fate <= -50) {
        display.textContent = "Darkness closes in.";
        display.classList.add("bad");
    }
}

function flash(btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 150);
}

// Blessing button
blessing.addEventListener("click", () => {
    fate += 10;
    display.textContent = "A blessing lifts your spirit.";
    flash(blessing);
    updateMeter();
});

// Curse button
curse.addEventListener("click", () => {
    fate -= 10;
    display.textContent = "A curse clouds your path.";
    flash(curse);
    updateMeter();
});

// Reveal button
reveal.addEventListener("click", () => {
    prophecy.classList.toggle("hidden");

    if (prophecy.classList.contains("hidden")) {
        display.textContent = "The prophecy fades.";
    } else {
        display.textContent = "The prophecy is revealed.";
    }

    flash(reveal);
});

// Reset button
reset.addEventListener("click", () => {
    fate = 0;
    display.textContent = "Choose your fate.";
    prophecy.classList.add("hidden");
    display.classList.remove("good", "bad");

    flash(reset);
    updateMeter();
});