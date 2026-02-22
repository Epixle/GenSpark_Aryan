function stepLogger(prefix) {
	return function (update) {
		console.log(prefix + " " + update.step);
	};
}

function logger(update) {
  	console.log("danger:", update.danger, "| step distance:", update.distance);
}

function dangerDetector(update) {
	if (update.danger > 3) {
		update.failed = true;
		update.status = "FAIL";
	}
}

function createDistanceTracker() {
	let total = 0;

	return function (update) {
		total = update.totalDistance;
		console.log("total distance:", total);

		if (update.isLast || update.status === "FAIL") {
			console.log(!update.failed ? "SUCCESS" : "FAIL");
		}
	};
}

function traverseCanyon(actionCallback) {
	const steps = [
		{
			step: "Climbing down",
			distance: 5,
			danger: 3
		},
		{
			step: "Traveling along the river",
			distance: 10,
			danger: 2
		},
		{
			step: "Alligator!",
			distance: -3,
			danger: 5
		},
		{
			step: "Climbing back up",
			distance: 5,
			danger: 3
		},
		{
			step: "Reaching finish",
			distance: 12,
			danger: 1
		},
	];

	let totalDistance = 0;
	let failed = false;

	for (let i = 0; i < steps.length; i++) {
		const s = steps[i];
		totalDistance += s.distance;

		const update = {
			step: s.step,
			distance: s.distance,
			danger: s.danger,
			totalDistance,
			failed,
			status: "OK",
			isLast: i === steps.length - 1,
		};

		actionCallback(update);

		failed = update.failed;
		if (update.status === "FAIL") break;
	}
}

const stepLog = stepLogger("Currently at");
const distanceTracker = createDistanceTracker();

traverseCanyon((update) => {
	stepLog(update);
	logger(update);
	dangerDetector(update);
	distanceTracker(update);
});