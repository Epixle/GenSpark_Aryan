function TaskCard({ task, statuses, move, deleteTask }) {
	function confirmDelete() {
		if (window.confirm(`Delete "${task.title}"?`))
			deleteTask(task.id);
	}

	return (
		<div className = "card">
			<div className = "cardTop">
				<strong>{task.title}</strong>
				<span className = "pill">{task.priority}</span>
			</div>

			<div className = "cardBtns">
				{statuses.map((s) => (
					<button key = {s} onClick = {()  => move(task.id, s)} disabled = {task.status === s}>
						{s}
					</button>
				))}
				<button className = "danger" onClick = {confirmDelete}>
					Delete
				</button>
			</div>
		</div>
	);
}

export default TaskCard;