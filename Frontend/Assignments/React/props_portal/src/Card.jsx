function Card({ title, category, level, rating, onSelect }) {
	const isTopPick = rating >= 4.5;
	const isAdvanced = level === "Advanced";

	return (
		<div className = {`card ${isAdvanced ? "card--advanced" : ""}`} onClick = {onSelect}>
			<div className = "cardTop">
				<h3 className = "cardTitle">{title}</h3>
				{isTopPick && <span className = "badge">Top Pick</span>}
			</div>

			<p className = "meta">Category: {category}</p>
			<p className = "meta">Level: {level}</p>
			<p className = "meta">Rating: {rating}</p>
		</div>
	);
}

export default Card;