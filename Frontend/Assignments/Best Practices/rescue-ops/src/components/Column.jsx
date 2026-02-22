import TaskCard from "./TaskCard";

function Column({ title, tasks, statuses, move, deleteTask }) {
	return (
		<div className = "col">
			<div className = "colHead">
				<h2>{title}</h2>
				<span className = "pill">{tasks.length}</span>
			</div>

			{tasks.length === 0 ? (
				<div className = "muted">No tasks</div>
			) : (
				tasks.map((t) => (
					<TaskCard
						key = {t.id}
						task = {t}
						statuses = {statuses}
						move = {move}
						deleteTask = {deleteTask}
					/>
				))
			)}
		</div>
	);
}

export default Column;