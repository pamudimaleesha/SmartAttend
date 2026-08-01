const lecturerController = require("../controllers/lecturerController");
const studentController = require("../controllers/studentController");
const express = require("express");
const router = express.Router();

const db = require("../config/db");
router.post(
"/lecturer-register",
lecturerController.registerLecturer
);
router.post(
"/student-register",
studentController.registerStudent
);
router.post("/student-login", (req, res) => {

    const { email, password } = req.body;


    const sql = 
    "SELECT * FROM students WHERE email = ? AND password = ?";


    db.query(sql, [email, password], (err, result) => {

        if(err){
            return res.status(500).json({
                message:"Database error"
            });
        }


        if(result.length > 0){

            res.json({
                message:"Login Successful",
                student: result[0]
            });

        }else{

            res.status(401).json({
                message:"Invalid Email or Password"
            });

        }

    });

});
router.post("/lecturer-login", (req, res) => {

    const { email, password } = req.body;

    const sql =
    "SELECT * FROM lecturers WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length > 0) {

            res.json({
                message: "Lecturer Login Successful",
                lecturer: result[0]
            });

        } else {

            res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

    });

});



module.exports = router;