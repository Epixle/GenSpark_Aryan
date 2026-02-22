const readline = require("readline");

function getInputRaw(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    return new Promise((resolve) => {
        rl.question(question + "\n> ", answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

async function getInput(question, valid) {
    if (!Array.isArray(valid)) {
        return await getInputRaw(question);
    }

    const validLower = valid.map(v => v.toLowerCase());

    while (true) {
        const ans = await getInputRaw(question);

        if (validLower.includes(ans.toLowerCase()))
            return ans;

        console.log("Input not recognized, please try again!");
    }
}

let goldCoins = 100;
let manaCrystals = 20;
let hasKey = true;
let potionName = "Healing";
let potionCount = 5;
let vaultSecurityLevel = 2;

let vaultAccess = false;
let vaultStatus = "CLOSED";

async function makeSpells() {
    let numSpells = 0;

    while (true) {
        const input = await getInput("\nHow many spells do you want to make?");
        
        numSpells = Number.parseInt(input, 10);

        if (Number.isInteger(numSpells) && numSpells >= 0) {
            break;
        }

        console.log("Please enter a valid whole number.");
    }

    const goldCost = 10;
    const manaCost = 3;
    
    const totalGoldCost = numSpells * goldCost;
    const totalManaCost = numSpells * manaCost;
    
    console.log(`\n${numSpells} spells costs ${totalManaCost} mana crystals and ${totalGoldCost} gold coins to make.`);

    let canMake = true;
    
    if (totalGoldCost > goldCoins) {
        console.log(`Not enough gold coins. Need ${totalGoldCost - goldCoins} to fulfill request.`);
        canMake = false;
    }

    if (totalManaCost > manaCrystals) {
        console.log(`Not enough mana. Need ${totalManaCost - manaCrystals} to fulfill request.`);
        canMake = false;
    }

    if (canMake) {
        manaCrystals -= totalManaCost;
        goldCoins -= totalGoldCost;

        console.log("Successfully crafted spells. Used vault resources.");
        vaultInfo();
    }
}

function openVault() {
    if (vaultAccess) {
       vaultStatus = "OPEN";
       console.log("\nOPENED VAULT");
    } else {
        console.log("\nSorry, you do not have access to open the vault.");
    }

    vaultInfo();
}

function vaultInfo() {
    console.log(`\nVAULT STATUS: ${vaultStatus}`);
    console.log(`Gold Coins: ${goldCoins}`);
    console.log(`Mana Crystals: ${manaCrystals}`);
    console.log(`Has Key: ${hasKey}`);
    console.log(`Potion: ${potionName}`);
    console.log(`Potion Count: ${potionCount}`);
    console.log(`Vault Security Level: ${vaultSecurityLevel}`);
}

async function main() {
    const name = await getInput("What is your name?");
    const rank = await getInput("What is your rank (Apprentice, Adept, or Master)?", ["Apprentice", "Adept", "Master"]);

    console.log(`Welcome, ${rank} ${name}!`);

    vaultAccess = (hasKey === true && vaultSecurityLevel <= 3) || rank.toLowerCase === "master";

    vaultInfo();

    while (true) {
        const choice = await getInput("\nWhat would you like to do?\n\t1. Make Spells\n\t2. Open Vault\n\t3. End", ["1", "2", "3"]);

        if (choice === "1")
            await makeSpells();
        else if (choice === "2")
            await openVault();
        else
            break;
    }
}

main();