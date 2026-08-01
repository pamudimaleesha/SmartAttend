import { useNavigate } from "react-router-dom";
import { FaQrcode, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";


function Navbar() {

  const navigate = useNavigate();


 const student = JSON.parse(
  localStorage.getItem("student")
);


const lecturer = JSON.parse(
  localStorage.getItem("lecturer")
);


const user = lecturer ? lecturer : student;


  const logout = () => {

    localStorage.removeItem("student");
    localStorage.removeItem("lecturer");

    navigate("/");

  };


  return (

    <nav className="smart-navbar">


      <div className="brand">

        <FaQrcode className="qr-logo"/>

        <span>
          SmartAttend
        </span>

      </div>



      <div className="nav-user">


        <FaUserCircle className="user-icon"/>


        <div className="user-info">

          <h6>
            {user ? user.name : "User"}
          </h6>


          <small>
            {student ? "Student" : "Lecturer"}
          </small>


        </div>



        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>


      </div>


    </nav>

  );

}


export default Navbar;