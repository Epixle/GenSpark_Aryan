const input = document.getElementById("input");
const add = document.getElementById("add");
const entries = document.getElementById("entries");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const empty = document.getElementById("empty");

let entryId = 0;

// Updates the UI so new entry length is reflected
function updateUI() {
    const count = entries.querySelectorAll(".entry").length;
    counter.textContent = "Total Entries: " + count;
    
    // If there are no entries, display no entry text otherwise hide it
    if (count === 0)
        empty.style.display = "block";
    else
        empty.style.display = "none";
}

// If there is input error, output the error otherwise remain blank
function setMessage(text) {
    message.textContent = text || "";
}

// Adds a row to the file
add.addEventListener("click", () => {
    setMessage("");
    const text = input.value.trim();

    // Fail entry addition if entry is blank
    if (text === "") {
        setMessage("Entry cannot be blank.");
        return;
    }

    // If ok, make a new row with entry and edit/delete buttons
    const newEntry = document.createElement("div");
    newEntry.className = "entry";
    newEntry.dataset.id = String(entryId++);

    // Span just to make it look less crowded
    const span = document.createElement("span");
    span.textContent = text;

    const edit = document.createElement("button");
    edit.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Give edit button an event listener
    edit.addEventListener("click", () => {
        // If clicked, prompt user for new entry
        setMessage("");
        const current = span.textContent;
        const updated = prompt("Edit entry:", current);

        if (updated === null) return;

        const newText = updated.trim();
        
        // Fail if entry is blank
        if (newText === "") {
            setMessage("Entry cannot be blank.");
            return;
        }

        span.textContent = newText;
    });

    // Delete button which gets rid of entry row
    deleteButton.addEventListener("click", () => {
        newEntry.remove();

        updateUI();
    });

    newEntry.append(span, edit, deleteButton);
    entries.append(newEntry);

    input.value = "";
    updateUI();
});

updateUI();