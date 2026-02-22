import Card from "./Card";

export default function MainContent() {

	const items = [
		{
			id: 1,
			title: "Rocket Initiated",
			content: "The rocket has activated its thrusters"
		},
		{
			id: 2,
			title: "Rocket Flying",
			content: "The rocket is currently soaring through the sky to its destination"
		},
		{
			id: 3,
			title: "Rocket Landed",
			content: "The rocket has successfully landed on the Moon! Congratulations!"
		}
	];

	return (
		<main className = "main">
			<h2 className = "sectionTitle">
				Main Content
			</h2>

			{items.map(item => (
				<Card key = {item.id} title = {item.title} content = {item.content}>
					<p>{item.content}</p>
				</Card>
			))}
		</main>
	);
}