import { useState } from "react";
import "./Form.css";

export default function Form({ onSubmitData }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [phone1, setPhone1] = useState("");
	const [phone2, setPhone2] = useState("");
	const [phone3, setPhone3] = useState("");

	function submitInfo(e) {
		e.preventDefault();

		onSubmitData({ name: name.trim(), email: email, password, phone: `${phone1}-${phone2}-${phone3}` });
	}

	return (<>
		<h1>Registration Form</h1>

		<form className = "card" onSubmit = { submitInfo }>
			<label htmlFor = "name">Name:&emsp;</label>
			<input type = "text" id = "name" value = {name} minLength = {3} pattern = "^[A-Za-z]+( [A-Za-z]+)*$" required
				onChange = {(e) => setName(e.target.value)}/>

			<br/><br/>

			<label htmlFor = "email">Email:&emsp;</label>
			<input type = "email" id = "email" value = {email} required
				onChange = {(e) => setEmail(e.target.value)}/>

			<br/><br/>

			<label htmlFor = "password">Password:&emsp;</label>
			<input type = "password" id = "password" value = {password} minLength = {6} required
				onChange = {(e) => setPassword(e.target.value.replace(" ", ""))}/>

			<br/><br/>

			Contact Info:&emsp;(+1)&emsp;
			<input type = "tel" id = "phone1" value = {phone1} inputMode = "numeric" maxLength = {3} pattern = "[0-9]{3}" size = {3} required
				onChange = {(e) => setPhone1(e.target.value.replace(/\D/g, "").slice(0, 3))}/> &nbsp;-&nbsp;
			
			<input type = "tel" id = "phone2" value = {phone2} inputMode = "numeric" maxLength = {3} pattern = "[0-9]{3}" size = {3} required
				onChange = {(e) => setPhone2(e.target.value.replace(/\D/g, "").slice(0, 3))}/> &nbsp;-&nbsp;
			
			<input type = "tel" id = "phone3" value = {phone3} inputMode = "numeric" maxLength = {4} pattern = "[0-9]{4}"size = {4} required
				onChange = {(e) => setPhone3(e.target.value.replace(/\D/g, "").slice(0, 4))}/>

			<br/><br/>

			<button type = "submit">Submit</button>
		</form>
	</>);
}