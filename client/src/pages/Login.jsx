import axios from "axios";
import { FaQrcode } from "react-icons/fa";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/attendance-bg.jpg";
function Login() {

  const navigate = useNavigate();

  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {

    try {

      let url = "";

      if (userType === "student") {

        url = "http://localhost:5000/api/auth/student-login";

      } else {

        url = "http://localhost:5000/api/auth/lecturer-login";

      }


      const response = await axios.post(
        url,
        {
          email: email,
          password: password
        }
      );
console.log(response.data);

      if(userType === "student"){

       localStorage.clear();

localStorage.setItem(
 "student",
 JSON.stringify(response.data.student)
);

        navigate("/student");

      } 
      else {

       localStorage.clear();

localStorage.setItem(
 "lecturer",
 JSON.stringify(response.data.lecturer)
);

      }


    } catch(error){

      alert("Invalid Email or Password");

    }

  };


  return (
<div 
 className="login-container"
 style={{
   backgroundImage: `
   linear-gradient(
     rgba(0,0,0,0.45),
     rgba(0,0,0,0.45)
   ),
   url(${bgImage})
   `
 }}
>

<div className="circle circle1"></div>
<div className="circle circle2"></div>


<div className="login-card">


<div className="logo-section">

<FaQrcode className="qr-icon"/>

<h1>
SmartAttend
</h1>

<p>
Smart QR Attendance Management System
</p>

</div>



<input
type="text"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>



<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>



<select
value={userType}
onChange={(e)=>setUserType(e.target.value)}
>

<option value="student">
Student
</option>

<option value="lecturer">
Lecturer
</option>

</select>



<button onClick={handleLogin}>
Login
</button>



<p className="signup-text">

Don't have an account?

<span onClick={()=>navigate("/register")}>
 Sign Up
</span>

</p>


</div>

</div>
);
}

export default Login;