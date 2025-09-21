import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
/*
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

------------
<div>
        <AddStudent state={state}/>
        <RequestRecommendation state={state}/>
        <ApproveRecommendation state={state}/>
        <UpdateApprovers state={state}/>
        <GetStudentDetails state={state}/>
     </div>
*/


  expect(linkElement).toBeInTheDocument();
});
