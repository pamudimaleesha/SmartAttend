import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRScanner from "./pages/QRScanner";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import Register from "./pages/Register";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/scanner" 
          element={<QRScanner />} 
        />


        <Route 
          path="/" 
          element={<Login />} 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />


        <Route 
          path="/student" 
          element={<StudentDashboard />} 
        />


        <Route 
          path="/lecturer" 
          element={<LecturerDashboard />} 
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;