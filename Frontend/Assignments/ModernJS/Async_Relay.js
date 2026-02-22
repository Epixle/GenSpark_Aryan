const runLap = (runner, minMs, maxMs, failRate = 0) =>
    new Promise((resolve, reject) => {
        const lapTime = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

        console.log(`${runner} starts running!`);

        setTimeout(() => {
            if (Math.random() < failRate) {
                console.log(`Oh no! ${runner} accidentally tripped and lost the race!`);
                reject({ runner, lapTime, status: "Failed" });
                return;
            }

            console.log(`${runner} made it across the finish line!`);
            resolve({ runner, lapTime, status: "Success" });
        }, lapTime);
    });

const relayRace = async () => {
    const results = [];
    let totalTime = 0;

    try {
        const r1 = await runLap("Runner 1", 400, 900);
        results.push(r1); totalTime += r1.lapTime;

        const r2 = await runLap("Runner 2", 600, 800);
        results.push(r2); totalTime += r2.lapTime;

        const r3 = await runLap("Runner 3", 400, 900, 0.30);
        results.push(r3); totalTime += r3.lapTime;

        const r4 = await runLap("Runner 4", 300, 750);
        results.push(r4); totalTime += r4.lapTime;

        console.log(`\nTotal time: ${totalTime} ms`);
        console.log(`All ${results.length} runners completed the race!`);
        console.log("Success!");
    } catch (err) {
        console.log(`\nTotal time: ${totalTime} ms`);
        console.log(`Only ${results.length} runners were able to complete the race`);
        console.log(`Failed`);
    }
};

relayRace();
