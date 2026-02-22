let itemPrices = [10, 20, 30, 40, 50];
let sum = 0;
let max = itemPrices[0];
let min = itemPrices[0];
let fourtyUp = 0;

console.log("Prices of the items before rounds:");
console.log(itemPrices.join(", "));

for (let round = 1; round <= 5; round++) {
    console.log("\nRound " + round);

    // Add an item
    itemPrices.push(round * 10);

    // Delete an item
    itemPrices.shift();

    // Update an item
    itemPrices[0] = itemPrices[0] + 1;

    // Search for an entry
    if (itemPrices.includes(50)) {
        console.log("There is an item that has price 50");
    }

    // Sort the array in ascending order
    itemPrices.sort((a, b) => a - b);

    // List all item prices in the array at the end of each round
    console.log(`Prices of the items at the end of Round ${round}:`);
    console.log(itemPrices.join(", "));
}

// Make sure there is at least 10 items in the shop with prices from 1 to 100
while (itemPrices.length < 10) {
    itemPrices.push(Math.floor(Math.random() * 100) + 1);
}

for (let i = 0; i < itemPrices.length; i++) {
    sum += itemPrices[i];

    if (itemPrices[i] > max)
        max = itemPrices[i];

    if (itemPrices[i] < min)
        min = itemPrices[i];

    if (itemPrices[i] >= 40)
        fourtyUp++;
}

let avg = sum / itemPrices.length;

console.log("\nStats Board:");
console.log(`Total number of items in the shop is ${itemPrices.length}`);
console.log(`The total sum of all prices is ${sum}`);
console.log(`The average is ${avg}`);
console.log(`The highest price is ${max}`);
console.log(`The lowest price is ${min}`);
console.log(`The number of items with a price >= 40 is ${fourtyUp}`);