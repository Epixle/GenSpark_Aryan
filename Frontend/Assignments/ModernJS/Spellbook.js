// List of all the spells as a JSON array. Each JSON has spell name, element, power, and mana cost.
const spells = [
    { 
        name: "Fireball",
        element: "Fire",
        power: 80,
        manaCost: 30
    },
    {
        name: "Ice Shard",
        element: "Ice",
        power: 55,
        manaCost: 18
    },
    {
        name: "Gust",
        element: "Air",
        power: 40,
        manaCost: 12
    },
    {
        name: "Earthquake",
        element: "Ground",
        power: 100,
        manaCost: 40
    },
    {
        name: "Thunder",
        element: "Lightning",
        power: 110,
        manaCost: 50
    },
    {
        name: "Water Pulse",
        element: "Water",
        power: 60,
        manaCost: 20
    },
    {
        name: "Vine Whip",
        element: "Nature",
        power: 45,
        manaCost: 14
    },
    {
        name: "Fake Out",
        element: "Dark",
        power: 40,
        manaCost: 20
    },
];

// Returns a string literal of all the spells containing their information
const listSpells = ({ name, element, power, manaCost }) => `${element} spell ${name} | Power: ${power}, Mana: ${manaCost}`;

// Prints out every spell according to the listSpells function format
const printSpells = (list) => {
    console.log("ES6 Spellbook");
    list.forEach(spell => console.log(listSpells(spell)));
};

// Returns spells array summary such as average power and strongest spell
const spellSummary = (list) => {
    let totalPower = 0;
    let highestPower = -Infinity;
    let highestName = "";
    let numSpells = 0;

    for (const { power, name } of list) {
        totalPower += power;
        numSpells++;
        
        if (power > highestPower) {
            highestPower = power;
            highestName = name;
        }
    }

    const averagePower = numSpells > 0 ? totalPower / numSpells : 0;

    return { numSpells, averagePower, highestName, highestPower };
};

// Prints out summary obtained from spellSummary function
const printSummary = ({ numSpells, averagePower, highestName, highestPower }) => {
    console.log("\nSpell Summary");
    console.log(`\nThe total number spells of spells is ${numSpells}`);
    console.log(`The average spell power is ${averagePower.toFixed(1)}`);
    console.log(`The strongest spell is ${highestName} at ${highestPower} base power`);
};

printSpells(spells);

printSummary(spellSummary(spells));