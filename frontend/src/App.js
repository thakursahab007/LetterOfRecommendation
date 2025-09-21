import { useState } from 'react';
import { useEffect } from 'react';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RequestRecommendation from './components/RequestRecommendation';
import ApproveRecommendation from './components/ApproveRecommendation';
import GetStudentDetails from './components/GetStudentDetails';
import AddStudent from './components/AddStudent';
import UpdateApprovers from './components/UpdateApprovers';
import abi  from './contract/LOR.json'
import { ethers } from 'ethers';

function App() {
const [state,setState] = useState(
  {
    provider:null,
    signer:null,
    contract:null
  }
);

useEffect(() => {
const connectWallet = async () => {
    const contractAddress = "0xd2a06C86e3734ceACED1eaeA105579E394687c1d";
    const contractAbi = abi.abi;

    try {
      const {ethereum} = window;
      if(ethereum){
        const accounts = await ethereum.request({method: "eth_requestAccounts"});

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractAbi,signer);

        setState({provider,signer,contract});

        
      }else{
        console.log("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }

};
 connectWallet();
},[]);


  return (
    <BrowserRouter>
      
      <nav>
        <Link to="/">Add Student</Link>   |{"    "}
        <Link to="/request">Request Recommendations</Link> |{"    "}
        <Link to="/approve">Approve Recommendations</Link> |{"    "}
        <Link to="/updateApprover">Update Approvers</Link> |{"    "}
        <Link to="/getDetails">Get Student Details</Link>
      </nav>

      
      <Routes>
        <Route path="/" element={<AddStudent state={state}/>} />
        <Route path="/request" element={<RequestRecommendation state={state}/>} />
        <Route path="/approve" element={<ApproveRecommendation state={state}/>} />
        <Route path="/updateApprover" element={<UpdateApprovers state={state}/>} />
        <Route path="/getDetails" element={<GetStudentDetails state={state}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
