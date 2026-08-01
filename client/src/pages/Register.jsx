import "../styles/Login.css";

function Register(){

  return (
    <div className="login-container">

      <div className="card login-card p-4 shadow">

        <h2 className="text-primary text-center">
          SmartAttend
        </h2>

        <p className="text-center">
          Create Account
        </p>


        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name"
        />


        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
        />


        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
        />


        <select className="form-select mb-3">

          <option>
            Student
          </option>

          <option>
            Lecturer
          </option>

        </select>


        <button className="btn btn-success w-100">
          Sign Up
        </button>


      </div>

    </div>
  );

}

export default Register;