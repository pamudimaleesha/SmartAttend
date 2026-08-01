import Navbar from "../components/Navbar";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import axios from "axios";
import "../styles/QRScanner.css";
function QRScanner() {


  useEffect(() => {


    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250
      }
    );


    scanner.render(

      async (decodedText) => {


        console.log("QR:", decodedText);


        try {


          const qrData = JSON.parse(decodedText);


          const student = JSON.parse(
            localStorage.getItem("student")
          );


          navigator.geolocation.getCurrentPosition(
            
            async(position)=>{


              const response = await axios.post(
                "http://localhost:5000/api/attendance/mark",
                {
                  student_id: student.student_id,
                  class_id: qrData.class_id,
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
              );


              alert(response.data.message);


            },

            ()=>{
              alert("Location permission required");
            }

          );


        }
        catch(error){

          console.log(error);
          alert("Invalid QR Code");

        }


      },


      (error)=>{

        console.log(error);

      }

    );


  },[]);



  return (

<>

<Navbar />


<div className="scanner-container">


<div className="scanner-card">


<h1>
SmartAttend
</h1>


<p>
Scan Attendance QR Code 📷
</p>



<div id="reader"></div>



<button
className="back-btn"
onClick={()=>window.history.back()}
>
Back
</button>


</div>


</div>


</>

);

}


export default QRScanner;