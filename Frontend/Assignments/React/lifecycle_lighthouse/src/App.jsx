import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState([]);
	const [filter, setFilter] = useState("All");
	const [beaconOn, setBeaconOn] = useState(false);

	function runFetch() {
		setLoading(true);
		setError(null);
		setData([]);

		setTimeout(() => {
			const fail = Math.random() < 0.25;

			if (fail) {
				setError("Fetch failed. Please try reload.");
				setLoading(false);
				return;
			}

			setData([
				{
					id: 1,
					title: "Fix error",
					priority: "High"
				},
				{
					id: 2,
					title: "Write README",
					priority: "Low"
				},
				{
					id: 3,
					title: "Make pretty",
					priority: "Low"
				},
				{
					id: 4,
					title: "Add mobile formatting",
					priority: "Low"
				},
				{
					id: 5,
					title: "Add tests",
					priority: "High"
				},
				{
					id: 6,
					title: "Deploy",
					priority: "High"
				},
			]);
			setLoading(false);
		}, 1000);
	}

	useEffect(() => {
		runFetch();
	}, []);

	useEffect(() => {
		const id = setInterval(() => {
			setBeaconOn((b) => !b);
		}, 1000);

		return () => clearInterval(id);
	}, []);

	const visible = filter === "All" ? data : data.filter((x) => x.priority === filter);

	return (
		<div className = "page">
			<h1>Lifecycle Lighthouse</h1>

			<div className = "layout">
				{} <section className = "panel">
					<h2>Status Panel</h2>

					<p>
						Beacon Pulse:{" "}
						<span className = {beaconOn ? "on" : "off"}>
							{beaconOn ? "ON" : "OFF"}
						</span>
					</p>

					{loading && <p>Loading...</p>}
					{!loading && error && <p className = "error">{error}</p>}
					{!loading && !error && <p className = "success">Success</p>}
				</section>

				{} <section className = "panel">
					<h2>Controls Panel</h2>

					<button onClick = {runFetch}>Reload</button>

					<div className = "controlRow">
						<label>Filter:</label>
						<select value = {filter} onChange = {(e) => setFilter(e.target.value)}>
							<option value = "All">All</option>
							<option value = "High">High Priority</option>
							<option value = "Low">Low Priority</option>
						</select>
					</div>

					<p>Total Items: {visible.length}</p>
				</section>
			</div>

			{} <section className = "panel">
				<h2>Data Display</h2>

				{loading && <p>Fetching items...</p>}

				{!loading && !error && (
					<ul className = "list">
						{visible.map((item) => (
							<li key = {item.id} className = "item">
								<span>{item.title}</span>
								
								<span className = {item.priority === "High" ? "tagHigh" : "tagLow"}>
									{item.priority}
								</span>
							</li>
						))}
					</ul>
				)}

				{!loading && error && <p>Nothing to show.</p>}
			</section>
		</div>
	);
}

export default App;