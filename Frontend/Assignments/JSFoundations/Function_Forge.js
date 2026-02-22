const readline = require("readline");

function getInputRaw(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question + "\n> ", (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function getInput(question, valid) {
    if (!Array.isArray(valid)) {
        return await getInputRaw(question);
    }

    const validLower = valid.map((v) => v.toLowerCase());

    while (true) {
        const ans = await getInputRaw(question);

        if (validLower.includes(ans.toLowerCase())) return ans;

        console.log("Input not recognized, please try again!");
    }
}

function isValidNumber(value) {
    if (value === "")
        return false;
    
    const n = Number(value);
    return Number.isFinite(n);
}

function totalWithTax(amount, tax) {
    return amount + amount * tax;
}

function isEven(number) {
    return number % 2 === 0;
}

function toTitleCase(text) {
    let thisArr = text.split(" ");
    let newArr = [];

    thisArr.forEach(word => {
        newArr.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    });

    return newArr.join(" ");
}

function findMax(a, b, c) {
    return Math.max(a, b, c);
}

function formatUsername(firstName, lastName) {
    const first = firstName.trim().toLowerCase();
    const last = lastName.trim().toLowerCase();
    return first[0] + last;
}

function sum(numArr) {
    let sum = 0;

    numArr.forEach(num => {
        sum += num;
    });

    return sum;
}

function average(numbersArray) {
    if (numbersArray.length === 0)
        return 0;

    return sum(numbersArray) / numbersArray.length;
}

async function controller(selection) {
    switch (selection) {
        case "1": {
            const amountStr = await getInput("How much are you spending?");
            const rateStr = await getInput("What is the tax rate (decimal form)?");

            if (!isValidNumber(amountStr) || !isValidNumber(rateStr))
                return "Invalid number input.";

            const amount = Number(amountStr);
            const rate = Number(rateStr);

            const total = totalWithTax(amount, rate);
            
            return `\nThe total amount is ${total.toFixed(2)}`;
        }

        case "2": {
            const nStr = await getInput("Enter a number:");
            if (!isValidNumber(nStr))
                return "Invalid number input.";
            
            const n = Number(nStr);

            if (isEven(n))
                return `\n${n} is even`

            return `\n${n} is odd`;
        }

        case "3": {
            const text = await getInput("Enter text to title case");
            
            return `\nThe title case version of the input text is: ${toTitleCase(text)}`;
        }

        case "4": {
            const a = await getInput("What is the first number you want to find the max of?");
            const b = await getInput("What is the second number you want to find the max of?");
            const c = await getInput("What is the third number you want to find the max of?");

            if (!isValidNumber(a) || !isValidNumber(b) || !isValidNumber(c))
                return "Invalid number input.";

            const max = findMax(Number(a), Number(b), Number(c));
            
            return `\nThe max number between ${a}, ${b}, and ${c} is ${max}`;
        }

        case "5": {
            const first = await getInput("Enter first name:");
            const last = await getInput("Enter last name:");
            
            return `\nYour username is: ${formatUsername(first, last)}`;
        }

        case "6": {
            const listStr = await getInput("Enter numbers separated by commas (example: 10,20,30):");
            const parts = listStr.split(",").map((s) => s.trim()).filter((s) => s.length > 0);

            if (parts.length === 0) return "Invalid number input.";

            for (const p of parts) {
                if (!isValidNumber(p)) return "Invalid number input.";
            }

            const nums = parts.map(Number);
            const avg = average(nums);
            
            return `\nThe average of all the numbers is ${avg}`;
        }

        default:
            return "\nUnrecognized input, please try again.";
    }
}

/* ---------- Menu / Program Driver ---------- */
async function main() {
    while (true) {
        console.log(`
Forge Menu
\t1. Total with tax
\t2. Find even number
\t3. Title case
\t4. Find the maximum of three number
\t5. Format username
\t6. Average of a list of numbers
\t7. Quit
        `);

        const choice = await getInput("What do you want to do?", ["1", "2", "3", "4", "5", "6", "7"]);
        if (choice === "7") break;

        const output = await controller(choice);
        console.log(output);
    }
}

main();