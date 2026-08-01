import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StudentDashboard.css";
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


<div className="student-container">


<h2>
Welcome Student 👋
</h2>



{
student && (

<div className="student-profile">

<h3>
{student.name}
</h3>

<p>
📧 {student.email}
</p>

<p>
🎓 Student ID : {student.student_id}
</p>


</div>

)

}




<div className="dashboard-cards">



<div className="student-card">

<h4>
📚 Today's Class
</h4>


<p>
Software Engineering
</p>


<p>
Time : 10.00 AM
</p>


</div>






<div className="student-card">


<h4>
📊 Attendance
</h4>


<h1>
{
attendance.length > 0 
? "100%" 
: "0%"
}
</h1>


<p>
Classes Attended :
{attendance.length}
</p>


</div>







<div className="student-card">


<h4>
📷 QR Attendance
</h4>


<button
className="scan-btn"
onClick={()=>navigate("/scanner")}
>

Scan QR Code

</button>


</div>




</div>


</div>

</>
);

}


export default StudentDashboard;