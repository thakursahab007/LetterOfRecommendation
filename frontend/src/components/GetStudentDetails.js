import { useState } from "react";

function GetStudentDetails({state}){
    const [details,setDetails] = useState(null);
    const [id,setID] = useState(0);
    const {contract} = state;

    const getStudentDetails = async () => {
        try {
            const data = await contract.getStudent(id);
            setDetails(data);

        } catch (error) {
            console.log(error);
        }
    };

    return (<div>
    Get Details of Student.
    <br/><br/>
    <input type="text" placeholder="Enter the id to get student Details" value={id} onChange={e => setID(e.target.value)}></input>
    <br/><br/>
    <button onClick={getStudentDetails}>Get Details</button>
    <div>
        {details && (
            <div>
            <p>Name: {details[0]}</p>
            <p>Course: {details[1]}</p>
            <p>Email: {details[2]}</p>
            <p>Approval Status: {details[3]}</p>
            </div>
        )}
    </div>
</div>
);
}
export default GetStudentDetails;