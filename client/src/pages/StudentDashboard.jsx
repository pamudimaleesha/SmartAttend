import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {

    const navigate = useNavigate();

    const [student,setStudent] = useState(null);
const [attendance, setAttendance] = useState([]);

   useEffect(()=>{

    const data = JSON.parse(
        localStorage.getItem("student")
    );


    if(!data){
        navigate("/");
        return;
    }


    setStudent(data);


    axios.get(
        `http://localhost:5000/api/attendance/student/${data.student_id}`
    )
    .then((response)=>{

        setAttendance(response.data);

    })
    .catch((error)=>{

        console.log(error);

    });


},[navigate]);



    const logout = ()=>{

        localStorage.removeItem("student");

        navigate("/");

    };


    return (
        <>

        <Navbar />

        <div className="container mt-4">

            <h2>
                Welcome Student 👋
            </h2>


            {
                student && (
                    <div className="card shadow p-3 mt-3">

                        <h4>
                            {student.name}
                        </h4>

                        <p>
                            Email: {student.email}
                        </p>

                    </div>
                )
            }


            <div className="row mt-4">


                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Today's Class
                        </h5>

                        <p>
                            Software Engineering
                        </p>

                    </div>

                </div>



                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Attendance
                        </h5>

                       <p>
    Classes Attended: {attendance.length}
</p>

<p>
    Attendance: 
    {
        attendance.length > 0 ? "100%" : "0%"
    }
</p>

                    </div>

                </div>



                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            QR Scanner
                        </h5>


                        <button
                        className="btn btn-success"
                        onClick={()=>navigate("/scanner")}
                        >
                            Scan QR 📷
                        </button>


                    </div>

                </div>


            </div>


            <button
            className="btn btn-danger mt-4"
            onClick={logout}
            >
                Logout
            </button>


        </div>

        </>
    );

}


export default StudentDashboard;