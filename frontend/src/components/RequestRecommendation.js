import { useState } from "react";

function RequestRecommendation({state}){
    const [id,setID] = useState(0);
    const {contract} = state;

    const handleRequest = async () => {
        try {
            const txn = await contract.requestRecommendation(id);
            await txn.wait();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            Request recommendations for the Students via ID.
            <br/><br/>
            <input type="text" placeholder="Enter ID" value={id} onChange={e => setID(e.target.value)}></input>
            <br/><br/>
            <button onClick={handleRequest}>Request Recommendation</button>
        </div>
    );
}
export default RequestRecommendation;