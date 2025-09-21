import { useState } from "react";

function AddStudent({state}){
const [id,setID] = useState(0);
const [name,setName] = useState("");
const [course,setCourse] = useState("");
const [email,setEmail] = useState("");
const {contract} = state;

const addStudent = async (e) => {
    e.preventDefault();
    try {
      if (contract) {
        const tx = await contract.addStudent(name, course, email);
        const receipt = await tx.wait(); // wait for mining
        console.log("The txn:-"+tx);
        console.log("The Recipt:-"+receipt);
        // 🔹 Extract the event
        const event = receipt.logs.find(
          (log) => log.fragment && log.fragment.name === "StudentAdded"
        );

        if (event) {
          const id = event.args[0].toString();
          setID(id);
          console.log("Student added with ID:", id);
        } else {
          console.log("No StudentAdded event found");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
    return (
    <div style={{ backgroundColor: "lightblue", padding: "20px", borderRadius: "10px", maxWidth: "400px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          rowGap: "15px",
          columnGap: "10px",
          alignItems: "center",
        }}
      >
        {/* Name */}
        <p style={{ margin: 0 }}>Name</p>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Course */}
        <p style={{ margin: 0 }}>Course</p>
        <input
          type="text"
          placeholder="Enter Course name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        {/* Email */}
        <p style={{ margin: 0 }}>Email</p>
        <input
          type="text"
          placeholder="Enter Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Empty cell for alignment */}
        <div></div>
        <button onClick={addStudent}>Add Student</button>
      </div>

      {/* Show student id */}
      {id && <p style={{ marginTop: "15px" }}>Student id: {id}</p>}
    </div>
  );
}
export default AddStudent;