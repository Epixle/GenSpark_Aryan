import React from "react";
import MyGoals from "./MyGoals";

function App() {

    const name = "Aryan";
    const today = new Date().toDateString();

	return (
		<div className = "container">
			<h1 className = "title">
				My First Render App
			</h1>

			<p className = "date">
				Today is {today}
			</p>

			<div className = "card">
				<h2>About Me</h2>

				<p>
					I live in Maryland and am learning various programming languages
					such as JavaScript like this!
				</p>
			</div>

			<MyGoals />
		</div>
	);
}

export default App;