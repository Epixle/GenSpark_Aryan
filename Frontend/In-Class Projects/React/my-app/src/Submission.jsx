import "./Submission.css";

export default function Submission({ data, onEdit }) {
    return (<>
        <h1>Submitted Information</h1>

        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Password: [Hidden]</p>
        <p>Contact Info: (+1) {data.phone}</p>

        <button onClick = {onEdit}>Edit</button>
    </>);
}