import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/LecturerDashboard.css";
function LecturerDashboard() {

  const [qr, setQr] = useState("");
  const [attendance, setAttendance] = useState([]);


  const generateQR = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/qr/generate",
        {
          class_id: 1
        }
      );

      setQr(response.data.qr);

    } catch(error){

      alert("QR Generate Failed");

    }

  };


  const getAttendance = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/attendance/class/1"
      );

      setAttendance(response.data);

    } catch(error){

      console.log(error);

    }

  };


  return (
    <>
      <Navbar />

      <div className="lecturer-container">

        <h2>
          Welcome Lecturer 👨‍🏫
        </h2>


        <div className="dashboard-card qr-section">

<h3>
📱 Generate Attendance QR
</h3>


<button
className="generate-btn"
onClick={generateQR}
>
Generate QR
</button>


{
qr && (

<div className="qr-box">

<img
src={qr}
alt="QR Code"
/>

</div>

)
}


</div>



        <div className="dashboard-card attendance-section">

<h3>
📋 Attendance Records
</h3>


<button
className="view-btn"
onClick={getAttendance}
>
View Attendance
</button>


<div className="table-responsive">

<table className="attendance-table">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Subject</th>
<th>Time</th>
</tr>

</thead>


<tbody>

{
attendance.map((item,index)=>(

<tr key={index}>

<td>{item.name}</td>

<td>{item.email}</td>

<td>{item.subject_name}</td>

<td>{item.attendance_time}</td>


</tr>

))
}

</tbody>


</table>

</div>


</div>

      </div>

    </>
  );
}


export default LecturerDashboard;