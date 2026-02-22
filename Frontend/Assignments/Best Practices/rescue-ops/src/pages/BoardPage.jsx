import { useState } from "react";
import TaskForm from "../components/TaskForm";
import Column from "../components/Column";
import makeID from "../utils/makeID";

const STATUSES = ["To Do", "Doing", "Done"];
const MAX_TASKS = 20;

function BoardPage() {
	const [tasks, setTasks] = useState([
		{
            id: makeID(),
            title: "Set up folders",
            status: "To Do",
            priority: "Med"
        },
		{
            id: makeID(),
            title: "Fix a bug",
            status: "Doing",
            priority: "High"
        },
		{
            id: makeID(),
            title: "Write notes",
            status: "Done",
            priority: "Low"
        },
	]);

	const [error, setError] = useState("");

	function valid(s) {
		return String(s).trim().replace(/\s+/g, " ");
	}

	function hasDuplicate(title) {
		return tasks.some((x) => valid(x.title).toLowerCase() === valid(title).toLowerCase());
	}

	function addTask({ title, priority }) {
		const cleaned = valid(title);

		if (!cleaned)
            return setError("Title cannot be empty.");
		
        if (tasks.length >= MAX_TASKS)
            return setError(`Max tasks is ${MAX_TASKS}.`);
		
        if (hasDuplicate(cleaned))
            return setError("Duplicate title.");

		setTasks((prev) => [{ id: makeID(), title: cleaned, status: "To Do", priority }, ...prev]);

		setError("");
	}

	function moveTask(id, nextStatus) {
		setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
	}

	function deleteTask(id) {
		setTasks((prev) => prev.filter((t) => t.id !== id));
	}

	return (
		<div className = "page">
			<header className = "header">
				<h1>Frontend Rescue Ops</h1>
				<p>Basic task board: add, move, delete.</p>
			</header>

			<section className = "panel">
				<TaskForm
					add = {addTask}
					error = {error}
					clear = {() => setError("")}
					count = {tasks.length}
					max = {MAX_TASKS}
				/>
			</section>

			<section className = "board">
				{STATUSES.map((status) => (
					<Column
						key = {status}
						title = {status}
						tasks = {tasks.filter((t) => t.status === status)}
						statuses = {STATUSES}
						move = {moveTask}
						deleteTask = {deleteTask}
					/>
				))}
			</section>
		</div>
	);
}

export default BoardPage;