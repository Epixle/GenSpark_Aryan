import { useState } from "react";

function TaskForm({ add, error, clear, count, max }) {
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("Med");

	const atLimit = count >=  max;

	function submit(e) {
		e.preventDefault();
		add({ title, priority });
	}

	return (
		<form onSubmit = {submit} className = "form">
			<div className = "row">
				<input
					value = {title}
					onChange = {(e) => {
						setTitle(e.target.value);
						if (error) clear();
					}}
					placeholder = "Task title..."
					maxLength = {60}
				/>

				<select
					value = {priority}
					onChange = {(e) => {
						setPriority(e.target.value);
						if (error) clear();
					}}
				>
					<option value = "Low">Low</option>
					<option value = "Med">Medium</option>
					<option value = "High">High</option>
				</select>

				<button type = "submit" disabled = {atLimit}>
					Add
				</button>
			</div>

			<div className = "muted">
				Tasks: {count}/{max}
			</div>

			{atLimit && <div className = "warn">Task limit reached.</div>}
			{error && <div className = "error">{error}</div>}
		</form>
	);
}

export default TaskForm;