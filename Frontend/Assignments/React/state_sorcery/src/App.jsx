import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [counterMsg, setCounterMsg] = useState("");
	const [shield, setShield] = useState(false);
	const [input, setInput] = useState("");
	const [items, setItems] = useState([]);
	const [lastAction, setLastAction] = useState("None yet");

	function inc() {
		setCounterMsg("");
		setCount((c) => { return c + 1} );
		setLastAction("Increment");
	}

	function dec() {
		setCounterMsg("");
		setCount((c) => {
			if (c === 0) {
				setCounterMsg("Counter cannot go below 0.");
				setLastAction("Failed Decrement");
				
				return 0;
			}
			
			setLastAction("Decrement");
			return c - 1;
		});
	}

	function reset() {
		setCounterMsg("");
		setCount(0);
		setLastAction("Reset");
	}

	function toggleShield() {
		setShield((shield) => {
			const next = !shield;
			setLastAction("Toggled Shield");
			return next;
		});
	}

	function addItem() {
		const text = input.trim();
		if (text === "") {
			setLastAction("Blocked Add Item (Empty String)");
			return;
		}

		setItems((prev) => [...prev, { id: Date.now(), text }]);
		setInput("");
		setLastAction(`Add Item: ${text}`);
	}

	function removeItem(id) {
		setItems((prev) => {
			const item = prev.find((x) => x.id === id);
			setLastAction(`Remove Item: ${item.text}`);
			
			return prev.filter((x) => x.id !== id);
		});
	}

	return (
		<div className = "page">
			<header className = "header">
				<h1>State Sorcery</h1>
			</header>

			<div className = "row">
				<div className = "panel">
					<h2>Counter</h2>

					<div className = "big">{count}</div>

					<div className = "buttons">
						<button onClick = {inc}>+1</button>
						<button onClick = {dec}>-1</button>
						<button onClick = {reset}>Reset</button>
					</div>

					{counterMsg && <p className = "warn">{counterMsg}</p>}
				</div>

				<div className = "panel">
					<h2>Toggle</h2>

					<p className = {shield ? "on" : "off"}>
						Spell Shield: {shield ? "ON" : "OFF"}
					</p>

					<button onClick = {toggleShield}>
						Toggle Shield
					</button>
				</div>
			</div>

			<div className = "panel">
				<h2>List Manager</h2>

				<div className = "inputRow">
					<input
						value = {input}
						onChange = {(e) => setInput(e.target.value)}
						placeholder = "Add a spell"
					/>

					<button onClick = {addItem}>Add</button>
				</div>

				<p>Total Items: {items.length}</p>

				<ul className = "list">
					{items.map((item) => (
						<li key = {item.id} className = "listItem">
							<span>{item.text}</span>
							<button onClick = {() => removeItem(item.id)}>Remove</button>
						</li>
					))}
				</ul>
			</div>

			<footer className = "footer">
				<p>Last Action: {lastAction}</p>
			</footer>
		</div>
	);
}

export default App;