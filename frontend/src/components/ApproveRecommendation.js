import { useState } from "react";

function ApproveRecommendation({state}){
    const [id,setID] = useState(0);
    const {contract} = state;

    const approveRequest = async () => {
        try {
            const tx = await contract.approveRecommendation(id);
            await tx.wait();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            Approve the request recommendations of Students.
            <br/><br/>
            <input type="text" placeholder="Enter Id" value={id} onChange={e => setID(e.target.value)}></input>
            <br/><br/>
            <button onClick={approveRequest}>Approve Request</button>
            
        </div>
    );
}
export default ApproveRecommendation;