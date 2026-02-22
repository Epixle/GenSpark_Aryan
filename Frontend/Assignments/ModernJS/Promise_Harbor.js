const dockShip = (shipName) => {
    return new Promise((resolve, reject) => {
        // If the ship has no name, cannot dock
        if (shipName.trim() === "") {
            reject("Could not dock, ship could not be found");
            return ;
        }

        // Return the ship after a delay of .5-2.5 seconds
        setTimeout(() => {
            resolve({ name: shipName.trim() });
        }, Math.floor(Math.random() * 2000) + 500);
    });
};

let bay = 1;

const simulateDock = (shipName) => {
  dockShip(shipName)
    .then(({ name }) => {
        console.log(`${name} has left the departure location!`);
        return { name: name.toUpperCase() };
    })
    .then(({ name }) => {
        console.log(`${name} has arrived at the harbor!`);
        return { name, bay: bay++ };
    })
    .then(({ name, bay }) => {
        console.log(`Successfully docked ${name} at Bay ${bay}`);
    })
    .catch(error => console.log(error))
    .finally(() => console.log("Docking attempt complete.\n"));
};

// Simulate the docking with 3 ships and a false result
simulateDock("Titanic");
simulateDock("Spinacher");
simulateDock("Jackdaw");
simulateDock("");