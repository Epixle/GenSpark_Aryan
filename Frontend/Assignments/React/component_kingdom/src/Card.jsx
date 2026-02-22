function Card({ title, content }) {
	return (
		<div className = "card">
			{title && <h3>{title}</h3>}
			
			<p>
				{content}
			</p>
		</div>
	);
}

export default Card;