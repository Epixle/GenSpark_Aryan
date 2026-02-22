import { useState } from "react";
import Card from "./Card";
import SelectedItem from "./SelectedItem";
import "./App.css";

function App() {
	const courses = [
		{
			id: 1,
			title: "Knitting for Dummies",
			category: "Arts and Crafts",
			level: "Beginner",
			rating: 4.2,
			lessons: 13
		},
		{
			id: 2,
			title: "Woodworking",
			category: "Arts and Crafts",
			level: "Advanced",
			rating: 4.6,
			lessons: 32
		},
		{
			id: 3,
			title: "Intro to JS",
			category: "Programming",
			level: "Intermediate",
			rating: 3.9,
			lessons: 58
		},
		{
			id: 4,
			title: "How to Moonwalk",
			category: "Misc",
			level: "Beginner",
			rating: 1.3,
			lessons: 1
		},
		{
			id: 5,
			title: "Birdwatching",
			category: "Nature",
			level: "Beginner",
			rating: 4.9,
			lessons: 24
		},
		{
			id: 6,
			title: "Analysis on the Revolutionary War",
			category: "History",
			level: "Advanced",
			rating: 4.5,
			lessons: 11
		},
	];

	const [selected, setSelected] = useState(null);

	return (
		<div className = "page">
			<header className = "header">
				<h1>Props Portal</h1>
				<p>Click on a course to see its details</p>
			</header>

			<div className = "layout">
				<main className = "main">
					<h2>Courses</h2>

					<div className = "grid">
						{courses.map((c) => (
							<Card
								key = {c.id}
								title = {c.title}
								category = {c.category}
								level = {c.level}
								rating = {c.rating}
								onSelect = {() => setSelected(c)}
							/>
						))}
					</div>
				</main>

				<aside className = "side">
					<SelectedItem item = {selected} />
				</aside>
			</div>
		</div>
	);
}

export default App;