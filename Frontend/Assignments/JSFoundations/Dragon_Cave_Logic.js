	//   --------------- Left/Right ------------------
	//   |					                         |
	// Goblin                       ------------ Left/Right --------------
	//   |			                |               					 |
	// Fight! -3                 Goblin	        		               Hallway
	//   |			                |			                		 |
	// Torch			       Fight! -3 ------------------------- Slow Trap! -1
    //                                               |
	// 			                    ------------ Left/Right ---------------
	// 			                    |					                  |
	// 		             Large Boulder (Torch only)		                Hallway
	//             			        |			                		  |
	// 	         Torch              ->    Narrow Escape -3   	 Torch    ->    Escape
	// 	         No Torch           ->	  Narrow Escape -5	     No Torch ->	Narrow escape -5
	// 	         Slowed + Torch     -> 	  Narrow Escape -5       Slowed   ->    Death
	// 	         Slowed + No Torch  ->    Death			                  |
	// 	            		        |				                    Stick!
	// 			                Treasure
	// 	            		        |
	//          Use torch --------------------- Open
	// 	           |		            		  |
	//      Mimic breaks boulder	            Mimic
	// 	           |				              |
	// 	         Stick!		                Fight -> Death


// Readline code
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

// Player Stats/Info
let hp = 10;
let status = "Healthy";
let hasTorch = false;

let killedFirstGoblin = false;
let killedSecondGoblin = false;

let trapTripped = false;
let boulderRolled = false;
let mimicBurned = false;

// Player takes damage according to amount parameter and decreases from HP stat
function takeDamage(amount, reason = "") {
    hp = Math.max(0, hp - amount);
    
    // List reason, damage amount, and remaining HP
    console.log(`\n${reason}\t-${amount} HP\n\nHP: ${hp}`);
}

// Returns if the user has died
function isDead() {
    return hp <= 0;
}

// Resets player's stats to replay the game
function resetGame() {
    hp = 10;
    status = "Healthy";
    hasTorch = false;

    killedFirstGoblin = false;
    killedSecondGoblin = false;

    trapTripped = false;
    boulderRolled = false;
    mimicBurned = false;
}

// User fights the goblin and takes 2 damage. Returns if they have won
async function goblinFight() {
    console.log("You unsheathe your blade to eliminate the foul beast.");
    takeDamage(2, "The goblin gets a few good hits in.");
    return !isDead();
}

// Encounter a goblin and take 1 damage if no torch. Choose to fight or run
async function goblinEncounter(room) {
    // If goblin is already dead, continue walking to next room, else start encounter
    if (room === 1 ? killedFirstGoblin : killedSecondGoblin) {
        console.log(`
        As you venture along the hallway, you can see the goblin you have slain.
        You continue, alert for more dangers lurking in the shadows.
        `);
        
        if (room === 2)
            return thirdRoom();
        
        return secondRoom();
    } else {
        if (!hasTorch) {
            console.log(`
        As you walk, a goblin suddenly emerges out of the dark!
        It takes an opportunity stab at you!
            `);

            takeDamage(1, "The goblin does a surprise attack");
            if (isDead())
                return false;
        } else {
            console.log(`
        You approach the goblin. It tries to take a swing at you, but because
        you can see it, you dodge successfully!
            `);
        }

        const choice = await getInput("What would you like to do?\n\t1. Fight\n\t2. Run Back", ["1", "2"]);

        if (choice === "1") {
            const win = await goblinFight();
            
            if (!win)
                return false;

            if (room === 1) {
                killedFirstGoblin = true;
                return obtainTorch();
            } else {
                killedSecondGoblin = true;
            }
                
            console.log(`
        You emerge victorious and live to tell another tale! But tread lightly
        as this might not be the only danger within this infamous dungeon.
            `);

            if (room === 2)
                return thirdRoom();
            else
                return secondRoom();
        } else {
            console.log(`
        You decide it's better to conserve your energy for greater battles.
            `);

            if (room === 1)
                return firstRoom();
            
            if (room === 2)
                return secondRoom();
            
            return thirdRoom();
        }
    }
}

// Get torch after going to the left side and killing the goblin.
function obtainTorch() {
    console.log(`
        You see a light behind the goblin you didn't see before... it's a torch! You grab it.

        With the torch in your grasp, you can confidently move forward through the dark cave.
        You can see the hallway you just came from. The goblin you encountered, lifeless.
        With nothing in the current room, you traverse back from where you came, the entrance.
        `)
    
    hasTorch = true;
    
    return firstRoom();
}

// If going to the right side in room 2 or left side in room 3, activate trap if untripped
function trapHallway(room) {
    if (!trapTripped) {
        console.log(`
        You creep carefully through the hallway, listening to every drop of water,
        the echos of your feet at every step, and the occasional eerie silence, when all
        of a sudden you hear a

                                        *click*

        You have activated a trap! Arrows shoot from the wall. You try to gracefully
        jump away from the area, but oh no! You took an arrow to the knee!

        It doesn't hurt much, but it's harder to walk now.`);
        takeDamage(1, "Took an arrow to the knee");

        // Trap gives the slowed status which influences boulder trap decision
        status = "Slowed";
        trapTripped = true;
    } else {
        console.log(`
        You walk through the trapped hallway once again. You move carefully through
        remembering what happened earlier, but it seems like the worst is behind you.`);
    }

    console.log(`
        You keep walking down the hall the way you were traveling.
    `)

    if (room === 2)
        return thirdRoom();
    
    return secondRoom();
}

async function treasureRoom() {
    if (!mimicBurned) {
        console.log(`
            You finally get to the bottom of the stairway. You peer into the room and see...
            a chest! Finally! Through all the trials and tribulations you faced, you
            finally reached where no man has before, the end of the Dragon's Cave. And at the
            end lay the final reward, the Dragon's treasure. The life of kings begins today.
        `);

        if (hasTorch) {
            const choice = await getInput("What would you like to do?\n\t1. Open the Chest\n\t2. ... BURN IT DOWN!\n\t3. Go back", ["1", "2", "3"]);
        
            if (choice === "1") {
                console.log(`
        You walk towards the chest, eager to finally claim your reward. You reach forward
        to open the hinge, eager to see the gold, gems, and top grade armor and weapons.
        With a final push you finally open the chest.

                                        Congratulations!
                `);

                return true;
            } else if (choice === "2") {
                console.log(`
        You decide you want to be an agent of chaos. Who cares about being rich? Fire!
        You use the torch to light the chest on fire. Only, it starts to run... A mimic!
        The mimic screeches in pain and starts running around the room! It runs down the
        stairs and eventually crashes into the large boulder, breaking it in pieces and
        taking itself down with it.
                `);

                return "Burned";
            } else {
                console.log(`
        Strangely, you decide not to open the chest and head back towards the third room.
                `);

                return thirdRoom();
            }
        }
    }

    console.log(`
        You finally get to the bottom of the stairway. You peer into the room and see...
        a chest! ... Another one? After seeing the dangerous mimic, you are conflicted
        between the glory of treasure and the dangers of a monster.
    `);

    const choice = await getInput("What would you like to do?\n\t1. Open the Chest\n\t2. ... BURN IT DOWN!\n\t3. Go back", ["1", "2", "3"]);
        
    if (choice === "1") {
        console.log(`
        You walk towards the chest, hoping this one would have more luck than the last,
        but still on guard from the previous incident. You lean towards it with the torch
        ready in your had and...

                                        Congratulations!
        `);

        return true;
    } else if (choice === "2") {
        console.log(`
        You decide not to trust it. With dangers present wherever you go, you know better
        than to trust another trap. The last mimic taught you more than enough. You go up
        with your torch to light this one to teach the monster a lesson like you did its
        bretheren before it, and you find that...

                                        Oops. It was real.
        `);

        return "Burned";
    } else {
        console.log(`
        Strangely, you decide not to open the chest and head back towards the third room.
        `);

        return thirdRoom();
    }
}

async function mimicRoom() {
    if (!mimicBurned) {
        console.log(`
        You finally get to the top of the stairway. You peer into the room and see...
        a chest! Finally! Through all the trials and tribulations you faced, you
        finally reached where no man has before, the end of the Dragon's Cave. And at the
        end lay the final reward, the Dragon's treasure. The life of kings begins today.
        `);

        if (hasTorch) {
            const choice = await getInput("What would you like to do?\n\t1. Open the Chest\n\t2. ... BURN IT DOWN!\n\t3. Go back", ["1", "2", "3"]);
        
            if (choice === "1") {
                console.log(`
        You walk towards the chest, eager to finally claim your reward. As you reach your hand
        out to open it, you see that it strangely is opening by itself... and it has sharp
        teeth... and a mouth?

        A mimic! You try to pull back, but it's too late. You are already within range. The
        mimic grabs you and swallows you whole, not a scrap of armor or hair left in sight.
                `);

                return false;
            } else if (choice === "2") {
                console.log(`
        You decide you want to be an agent of chaos. Who cares about being rich? Fire!
        You use the torch to light the chest on fire. Only, it starts to run... A mimic!
        The mimic screeches in pain and starts running around the room! It runs down the
        stairs and eventually crashes into the large boulder, breaking it in pieces and
        taking itself down with it.
                `);

                mimicBurned = true;

                const room = await getInput("What would you like to do?\n\t1. Head to the bottom room\n\t2. Go back to the third room", ["1", "2"]);

                if (room === "1")
                    return treasureRoom();

                return thirdRoom();
            } else {
                console.log(`
        Strangely, you decide not to open the chest and head back towards the third room.
                `);

                return thirdRoom();
            }
        }

        const choice = await getInput("What would you like to do?\n\t1. Open the Chest\n\t2. Go back", ["1", "2"]);

        if (choice === "1") {
            console.log(`
        You walk towards the chest, eager to finally claim your reward. As you reach your hand
        out to open it, you see that it strangely is opening by itself... and it has sharp
        teeth... and a mouth?

        A mimic! You try to pull back, but it's too late. You are already within range. The
        mimic grabs you and swallows you whole, not a scrap of armor or hair left in sight.
            `);

            return false;
        }
        
        console.log(`
        Strangely, you decide to head back towards the third room.
        `);

        return thirdRoom();
    }

    console.log(`
        You walk back into the mimic room, but nothing is here since the mimic already
        ran and destroyed the boulder at the bottom of the stairs.
    `);

    const choice = await getInput("Where would you like to go?\n\t1. Bottom room\n\t2. Back to third room", ["1", "2"]);

        if (choice === "1") {
            console.log(`
        You decide to down to the room at the bottom of the stairs.
            `);

            return treasureRoom();
        }

        console.log(`
        You decide to go back to the third room.
        `);

        return thirdRoom();
}

async function boulder(direction) {
    if (!boulderRolled) {
        boulderRolled = true;

        console.log(`
        You walk through the wide passageway as you reach closer and closer to the light
        when all of a sudden, you hear a loud smash and a constant rumbling noise.`);

        if (hasTorch) {
            console.log(`
        With the torch, you realize that at the top of the stairs, a boulder dropped and
        is now barreling towards you. You rush down as quick as you can`);

            if (status === "Slowed") {
                console.log(`
        Although you had a head start, the arrow makes you unable to run properly. In a
        desparate attempt, you leap towards the opening to the room, but not without the
        boulder smashing into you. By the will of the Gods, you're still somehow alive.
                `);

                takeDamage(5, "The boulder hit you!");

                if (isDead())
                    return false;

                if (direction === "4")
                    return treasureRoom();

                return thirdRoom();
                
            } else {
                console.log(`
        Although the situation is dire, your body flies like a stallions. You dash into the
        room just as you felt the wind of the boulder graze narrowly past you. By the luck of
        the Gods, you've barely escaped with your life.
                `);
            }

            if (direction === "4")
                return treasureRoom();
            
            return thirdRoom();
        } else {
            console.log(`
        In a daze, you take a moment, to analyze this situation. However, in an emergency,
        every moment counts. You decide to run back to the closest opening to take a moment to
        collect yourself.`);

            if (status === "Slowed") {
                console.log(`
        You try to run back, but the pain in your knee from the arrow hinders your movement.
        Still, you keep pushing for the unknown is far more dangerous. Your eyes suddenly see
        movement, a large object hurdling towards you. As quickly as you can move, it is still
        not quick enough. The boulder has caught up. 
                `);

                return false;
            } else {
                console.log(`
        Although the situation is dire, your body flies like a stallions. However, that
        moment of thought was costly. The object now reaches your vision - a large boulder
        barreling down the stairs. In a desparate attempt, you leap towards the opening to
        the room, but not without the boulder smashing into you. By the will of the Gods,
        you're still somehow alive.
                `);

                takeDamage(5, "The boulder hit you!");

                if (isDead()) {
                    return false;
                }

                if (direction === "4")
                    return treasureRoom();

                return thirdRoom();
            }
        }

        return thirdRoom();
    }
}

async function thirdRoom() {
    if (!boulderRolled) {
        if (hasTorch) {
            if (!killedSecondGoblin) {
                console.log(`
        The torch lights your way as you walk.
        You notice that the path you chose merged with the other as you reach the third room.

        In front of you, you see a stairway that leads up and down. At the end of each stairway is
        a small light you believe to be rooms.

        Behind you are the two paths you saw in the second room.
        On the left, you see a long and empty path... for now.
        On the right, you see a goblin in the distance! Better act now before the light attracts it!
                `);
            } else {
                console.log(`
        The torch lights your way as you walk.
        You notice that the path you chose merged with the other as you reach the third room.

        In front of you, you see a stairway that leads up and down. At the end of each stairway is
        a small light you believe to be rooms.

        Behind you are the two paths you saw in the second room.
        On the left, you see a long and empty path... for now.
        On the right, you see a long hallway with the goblin you fought laying motionless on the floor.
                `);
            }

            const third = await getInput("Where would you like to go?\n\t1. Left\n\t2. Right\n\t3. Up\n\t4. Down", ["1", "2", "3", "4"]);

            if (third === "1") {
                return trapHallway(3);
            } else if (third === "2") {
                return goblinEncounter(3);
            } else {
                return boulder(third);
            }
        } else {
                console.log(`
        You notice that the path you chose merged with the other as you reach the third room.

        In front of you, you see a stairway that leads up and down.

        Behind you are the two paths you saw in the second room. It is too dark to make
        anything out, but you know they lead back to the second room.
                `);

            const third = await getInput("Where would you like to go?\n\t1. Left\n\t2. Right\n\t3. Up\n\t4. Down", ["1", "2", "3", "4"]);

            if (third === "1") {
                return trapHallway(3);
            } else if (third === "2") {
                return goblinEncounter(3);
            } else {
                return boulder(third);
            }
        }
    } else if (!mimicBurned) {
        console.log(`
        You make it back to the third room.

        You can still see the tunnel that leads both up and down, but you know that
        the large boulder is blocking the path down. You can only go up from the tunnel.

        Behind you are the two paths you saw in the second room.
        On the left, you see a long and empty path... for now.
        On the right, you see a goblin in the distance! Better act now before the light attracts it!
        `);

        const third = await getInput("Where would you like to go?\n\t1. Left\n\t2. Right\n\t3. Up", ["1", "2", "3"]);

        if (third === "1") {
            return trapHallway(3);
        } else if (third === "2") {
            return goblinEncounter(3);
        } else {
            return mimicRoom();
        }
    }
    
    console.log(`
        You make it back to the third room.

        You can still see the tunnel that leads both up and down. You know the mimic
        destroyed the path to the bottom room. There is nothing at the top.

        Behind you are the two paths you saw in the second room.
        On the left, you see a long and empty path... for now.
        On the right, you see a goblin in the distance! Better act now before the light attracts it!
    `);

    const third = await getInput("Where would you like to go?\n\t1. Left\n\t2. Right\n\t3. Down", ["1", "2", "3"]);

    if (third === "1") {
        return trapHallway(3);
    } else if (third === "2") {
        return goblinEncounter(3);
    } else {
        return treasureRoom();
    }
}

async function secondRoom() {
    if (hasTorch) {
        if (!killedSecondGoblin) {
            console.log(`
        The torch lights your way as you walk.
        You have reached the second room.

        On the left, you see a goblin in the distance! Better act now before the light attracts it!
        On the right, you see a long and empty path... for now.
        Behind you is the hallway that leads to the first room.
            `);
        } else {
            console.log(`
        The torch lights your way as you walk.
        You have reached the second room.

        On the left, you see a long hallway with the goblin you fought laying motionless on the floor.
        On the right, you see a long and empty path... for now.
        Behind you is the hallway that leads to the first room.
            `);
        }
    } else {
        console.log(`
        After walking through the long hallway, you find that you have reached the
        second room of the cave. You see a split in the path. It is too dark to make
        anything out. You know the hallway behind you leads back to the first room.
        `);
    }

    const second = await getInput("Where would you like to go?\n\t1. Left\n\t2. Right\n\t3. Back to the first room", ["1", "2", "3"]);

    if (second === "1") {
        return goblinEncounter(2);
    } else if (second === "2") {
        return trapHallway(2);
    } else {
        console.log(`
    You head back to the first room.
        `);
        return firstRoom();
    }
}

async function firstRoom() {
    // If the user has obtained the torch, can see the path of dead goblin and regular path
    if (hasTorch) {
        console.log(`
        The torch lights your way as you walk.
        You have reached the first room.

        On the left, you see a dead end with the goblin you fought laying motionless on the floor.
        On the right, you see a seemingly empty path that you think leads to an opening.
        Behind you is the cave's exit.
        `);

        // Give an option to either go right or out of cave.
        const first = await getInput("Where would you like to go?\n\t1. Right\n\t2. Exit Cave", ["1", "2"]);

        if (first === "1") {
            return secondRoom();
        }

        console.log(`
        You have left with your life. That is more than most.
        `);
            
        return "Escaped";
    } else {
        // If the player does not have a torch, such as in beginning, they make a blind choice
        console.log(`
        As you approach the first room of the cave, just barely lit from the sunlight
        of the cave's entrance, you see a split in the path. It is too dark to make
        anything out.
        `);
        const first = await getInput("Where would you like to go?\n\t1. Left\n\t2. Right\n\t3. Exit Cave", ["1", "2", "3"]);

        if (first === "1") {
            console.log(`
        You choose to go to the left.
            `)

            return goblinEncounter(1);
        } else if(first === "2") {
            console.log(`
        You choose to go to the right.
            `)

            return secondRoom();
        }
        console.log(`
        You have left with your life. That is more than most.
        `);
        
        return "Escaped";
    }
}

async function main() {
    const start = await getInput("\t1. Begin your Journey\n\t2. Run away alive", ["1", "2"]);

    if (start === "2") {
        console.log("You are a wise one, adventurer...");
        return;
    }

    while (true) {
        console.log(`
        Braver than most, you venture to the cave. The tales spoke of dangers that
        could frighten even the bravest of warriors, and best the strongest of heroes.
        However, that did not stop adventurers from entering the Dragon's dwellings.

        Conquer the cave, and you too may live the life of a king... or die trying.
        `);

        const name = await getInput("What is your name, adventurer?");
        console.log(`\nMay God have mercy on your soul, ${name.trim()}.`);

        resetGame();
        const result = await firstRoom();

        if (result === "Escaped") {}
        else if (result === "Burned") {
            console.log(`
        You just burned the Dragon's treasure. It could have been something
        amazing, but no. You just burned it. Next time then, maybe...
            `);
        } else if (result) {
            console.log(`
        You have obtained the Dragon's treasure: a stick!
        It's just a normal stick. But it's a really cool stick!
            `);
        } else {
        
            console.log(`
        You have died. Your name will be lost among all else who have succumbed to their desires.
            `);
        }
        
        const again = await getInput("Would you like to try again?\n\tY. Another warrior\n\tN. I've had enough...", ["Y", "N"]);

        if (again === "N") {
            return;
        }
    }
}

main();