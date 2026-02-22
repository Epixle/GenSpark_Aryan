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

let numBullets = 0;
let oppNumBullets = 0;
let specialBullet = false;
let oppSpecialBullet = false;
let defenseStreak = 0;
let oppDefenseStreak = 0;

const MAX_TURNS = 30;

async function main() {
    console.log(
`Let's play Cowboys! 

RULES:
1. Can choose to reload, shoot, shield, and reflect
2. Cannot shoot before you reload
3. Shield protects you from the opponents shot
4. Reflect reflects the bullet back to the opponent and you win if they shoot you
5. Can not shield and reflect more than 3 times in a row
6. If you reload 3 times, your bullets become a special bullet that can break through reflect!

Ready? GO!
`);

    for (let turn = 0; turn < MAX_TURNS; turn++) {
        console.log(`\nYour number of bullets: ${numBullets}/6`);
        console.log(`Opponent's number of bullets: ${oppNumBullets}/6\n`);
        const choice = await getInput("\nWhat will you do?\n\t1. Reload\n\t2. Shoot\n\t3. Shield\n\t4. Reflect", ["1", "2", "3", "4"]);
        
        const oppChoice = Math.floor(Math.random() * 4 + 1);

        // Print the choice the player made
        if (choice === "1") {
            console.log("You chose to reload.");
            defenseStreak = 0;
        } else if (choice === "2") {
            console.log("You chose to shoot.");
            defenseStreak = 0;
        } else if (choice === "3") {
            if (++defenseStreak >= 4)
                console.log("You chose to shield, but failed! Too many defense in a row!");
            else
                console.log("You chose to shield.");
        } else if (choice === "4") {
            if (++defenseStreak >= 4)
                console.log("You chose to reflect, but failed! Too many defense in a row!");
            else
                console.log("You chose to reflect.");
        }
        
        // Print the choice the opponent made
        if (oppChoice === 1) {
            console.log("The opponent chose to reload.");
            oppDefenseStreak = 0;
        } else if (oppChoice === 2) {
            console.log("The opponent chose to shoot.");
            oppDefenseStreak = 0;
        } else if (oppChoice === 3) {
            if (++oppDefenseStreak >= 4)
                console.log("The opponent chose to shield, but failed! Too many defense in a row!");
            else
                console.log("The opponent chose to shield.");
        } else if (oppChoice === 4) {
            if (++oppDefenseStreak >= 4)
                console.log("The opponent chose to reflect, but failed! Too many defense in a row!");
            else
                console.log("The opponent chose to reflect.");
        }

        switch (choice) {
            // Player reloads
            case "1":
                // cap at 6
                if (numBullets < 6) {
                    if (++numBullets === 3)
                        specialBullet = true;
                }

                // If opponent chooses to reload, add bullet (cap at 6)
                if (oppChoice === 1) {
                    if (oppNumBullets < 6) {
                        if (++oppNumBullets === 3)
                            oppSpecialBullet = true;
                    }
                }

                // If the opponent has a bullet and shoot, player loses
                if (oppChoice === 2) {
                    if (oppNumBullets > 0) {
                        oppNumBullets--; // spend opponent bullet
                        console.log("\nYou weren't protected and the opponent shot you! You lost!");
                        return;
                    }
                    
                    // Game continues if opponent has no bullets
                    console.log("\nThe opponent tried to shoot you, but they didn't have any bullets! You're safe!");
                    continue;
                }

                console.log("\nNothing happened! Game continues.");
                continue;
            
            // Player shoots
            case "2": {
                // If the player has no bullets, fail shot
                if (numBullets === 0) {
                    console.log("\nYou have no bullets! Need to reload first!");

                    // If failed shot and opponent reloads, add bullet. Make special if 3 (cap at 6)
                    if (oppChoice === 1) {
                        if (oppNumBullets < 6) {
                            if (++oppNumBullets === 3)
                                oppSpecialBullet = true;
                        }
                    }

                    // If failed shot and opponent shoots, player lost
                    if (oppChoice === 2) {
                        if (oppNumBullets > 0) {
                            oppNumBullets--; // spend opponent bullet
                            console.log("\nYou weren't protected and the opponent shot you! You lost!");
                            return;
                        }
                    
                        // Game continues if opponent has no bullets
                        console.log("\nThe opponent tried to shoot you, but they didn't have any bullets! You're safe!");
                        continue;
                    }

                    console.log("\nNothing happened! Game continues.");
                    continue;
                }

                // Spend player's bullet(s) when shooting
                const bulletsSpent = specialBullet ? 3 : 1;
                if (numBullets < bulletsSpent) {
                    console.log("\nYou don't have enough bullets for a special shot! Need to reload first!");
                    continue;
                }
                numBullets -= bulletsSpent;

                // If player used a special shot, consume the special
                if (specialBullet) specialBullet = false;

                // If player does have bullet, make decision based on opponent choice
                switch (oppChoice) {
                    // If opponent reloads, player wins
                    case 1:
                        console.log("\nThe opponent wasn't protected and you shot them! You won!");
                        return;

                    case 2:
                        // If opponent shoots and they have a bullet, tie
                        if (oppNumBullets > 0) {
                            oppNumBullets--; // spend opponent bullet
                            console.log("\nYou shot each other! It's a tie!");
                            return;
                        }

                        // If opponent has no bullet, player win
                        console.log("\nThe opponent didn't have any bullets and you shot them! You won!");
                        return;

                    case 3:
                        // If opponent defends and they have too many in a row, fails and player win
                        if (oppDefenseStreak >= 4) {
                            console.log("\nThe opponent failed to shield and you shot them! You won!");
                            return;
                        }
                        
                        console.log("\nYou shot the opponent, but they were shielded! They are safe! Game continues.");
                        continue;

                    case 4:
                        // If opponent defends and they have too many in a row, fails and player win
                        if (oppDefenseStreak >= 4) {
                            console.log("\nThe opponent failed to reflect and you shot them! You won!");
                            return;
                        }

                        // Special shot breaks through reflect (you already spent bullets above)
                        if (bulletsSpent === 3) {
                            console.log("\nThe opponent reflected, but your special bullet broke through! You won!");
                            return;
                        }

                        // Otherwise reflected
                        console.log("\nThe opponent reflected your shot! You lost!");
                        return;

                    default:
                        return;
                }
            }
            
            case "3":
                switch (oppChoice) {
                    case 1:
                        // cap at 6
                        if (oppNumBullets < 6) {
                            if (++oppNumBullets === 3)
                                oppSpecialBullet = true;
                        }
                        
                        console.log("\nNothing happened! Game continues.");
                        continue;
                    case 2:
                        if (oppNumBullets > 0) {
                            oppNumBullets--;

                            if (defenseStreak >= 4) {
                                console.log("\nYou failed to shield and the opponent shot you! You lost!");
                                return;
                            }

                            console.log("\nThe opponent shot you, but you were shielded! You are safe! Game continues.");
                            continue;
                        }
                        
                        console.log("\nThe opponent tried to shoot you, but they didn't have any bullets! You're safe!");
                        continue;
                    case 3:
                        console.log("\nNothing happened! Game continues.");
                        continue;
                    case 4:
                        console.log("\nNothing happened! Game continues.");
                        continue;
                    default:
                        return;
                }

            case "4":
                switch (oppChoice) {
                    case 1:
                        // cap at 6
                        if (oppNumBullets < 6) {
                            if (++oppNumBullets === 3)
                                oppSpecialBullet = true;
                        }

                        console.log("\nNothing happened! Game continues.");
                        continue;
                    case 2:
                        if (oppNumBullets > 0) {
                            oppNumBullets--;

                            if (defenseStreak >= 4) {
                                console.log("\nYou failed to reflect and the opponent shot you! You lost!");
                                return;
                            }

                            console.log("\nYou reflected the opponent's shot! You won!");
                            return;
                        }
                        
                        console.log("\nThe opponent tried to shoot you, but they didn't have any bullets! You're safe!");
                        continue;
                    case 3:
                        console.log("\nNothing happened! Game continues.");
                        continue;
                    case 4:
                        console.log("\nNothing happened! Game continues.");
                        continue;
                    default:
                        return;
                }
        }
    }

    console.log("\nMax turns reached! It's a tie!");
}

main();