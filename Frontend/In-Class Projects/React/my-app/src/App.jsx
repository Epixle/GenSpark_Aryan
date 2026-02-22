import { useState } from "react";
import Form from "./Form.jsx";
import Submission from "./Submission.jsx";

export default function App() {
    const [info, setInfo] = useState(null);

    return (<>
        {info ? (
            <Submission data = {info} onEdit = {() => setInfo(null)}/>
        ) : (
            <Form onSubmitData = {setInfo}/>
        )}
    </>);
}