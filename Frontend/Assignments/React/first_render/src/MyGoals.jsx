import React from "react";

function MyGoals() {

    const goals = [
      "Learn React",
      "Reinforce my knowledge of AI concepts",
      "Work on real world projects",
      "Complete the training"
    ];

    return (
		<div className = "card">

			<h2>My Learning Goals</h2>

			<ul>
			{goals.map((goal, index) => (
				<li key = {index}>
					{goal}
				</li>
			))}
			</ul>
		</div>
    );
}

export default MyGoals;