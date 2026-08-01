import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

      <div className="container mt-4">

        <h2>
          Welcome Lecturer 👨‍🏫
        </h2>


        <div className="card shadow p-4 mt-4 text-center">

          <h4>
            Generate Attendance QR
          </h4>


          <button
            className="btn btn-success mb-3"
            onClick={generateQR}
          >
            Generate Attendance QR
          </button>


          {
            qr && (
              <img
                src={qr}
                alt="QR"
                width="250"
              />
            )
          }

        </div>



        <div className="card shadow p-4 mt-4">

          <h4>
            Attendance List
          </h4>


          <button
            className="btn btn-primary mb-3"
            onClick={getAttendance}
          >
            View Attendance
          </button>



          <table className="table table-bordered">

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

    </>
  );
}


export default LecturerDashboard;