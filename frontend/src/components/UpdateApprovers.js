import { useState } from "react";

function UpdateApprovers({state}){
    const [appAddress,setAppAddress] = useState("");
    const [removeAddress,setRemoveAddress] = useState("");
    const {contract} = state;

    const addApprover = async () => {
        try {
            const txn = await contract.addApprover(appAddress);
            await txn.wait();
        } catch (error) {
            console.log(error);
        }
    };
    const removeApprover = async () => {
        try {
            const txn = await contract.removeApprover(removeAddress);
            await txn.wait();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            Update the Approvers list who can Approve the recommendations for Students.
            <br/><br/>
            <input type="text" placeholder="Enter address to add Approver" value={appAddress} onChange={e => setAppAddress(e.target.value)}></input>
            <br/><br/>
            <button onClick={addApprover}>Add Approver</button>
            <br/><br/>
            <input type="text" placeholder="Enter address to remove Approver" value={removeAddress} onChange={e => setRemoveAddress(e.target.value)}></input>
            <br/><br/>
            <button onClick={removeApprover}>Remove Approver</button>
        </div>
    );
}
export default UpdateApprovers;