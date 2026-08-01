import axios from "axios";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

        localStorage.setItem(
          "student",
          JSON.stringify(response.data.student)
        );

        navigate("/student");

      } 
      else {

        localStorage.setItem(
          "lecturer",
          JSON.stringify(response.data.lecturer)
        );

        navigate("/lecturer");

      }


    } catch(error){

      alert("Invalid Email or Password");

    }

  };


  return (
    <div className="login-container">

      <div className="card login-card p-4 shadow">

        <h2 className="text-primary text-center">
          SmartAttend
        </h2>

        <p className="text-center">
          Login Page
        </p>


        <input
          type="text"
          className="form-control mb-3"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />


        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />


        <select
          className="form-select mb-3"
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


        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>
<p className="text-center mt-3">

Don't have an account?

<span
style={{cursor:"pointer", color:"blue"}}
onClick={()=>navigate("/register")}
>
 Sign Up
</span>

</p>

      </div>

    </div>
  );

}

export default Login;