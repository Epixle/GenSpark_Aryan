function SelectedItem({ item }) {
	if (!item) {
		return (
			<div className = "panel">
				<h2>Selected Item</h2>
				<p>Information of selected course shown here</p>
			</div>
		);
	}

	return (
		<div className = "panel">
			<h2>{item.title}</h2>
			<p>Category: {item.category}</p>
			<p>Level: {item.level}</p>
			<p>Rating: {item.rating}</p>
			<p>Lessons: {item.lessons}</p>
		</div>
	);
}

export default SelectedItem;