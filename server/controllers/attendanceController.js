const db = require("../config/db");


exports.markAttendance = (req, res) => {

    const {
        student_id,
        class_id,
        latitude,
        longitude
    } = req.body;


    const sql = `
    INSERT INTO attendance
    (student_id, class_id, latitude, longitude)
    VALUES (?, ?, ?, ?)
    `;


    db.query(
        sql,
        [
            student_id,
            class_id,
            latitude,
            longitude
        ],
        (err, result)=>{


            if(err){

                return res.status(500).json({
                    message:"Attendance Failed",
                    error:err.message
                });

            }


            res.json({

                message:"Attendance Marked Successfully",
                attendance_id: result.insertId

            });


        }
    );

};
// Get student attendance history

exports.getStudentAttendance = (req, res) => {

    const student_id = req.params.id;


    const sql = `
    SELECT 
        attendance.attendance_id,
        subjects.subject_name,
        classes.class_date,
        attendance.attendance_time,
        attendance.latitude,
        attendance.longitude

    FROM attendance

    JOIN classes
    ON attendance.class_id = classes.class_id

    JOIN subjects
    ON classes.subject_id = subjects.subject_id

    WHERE attendance.student_id = ?
    `;


    db.query(sql, [student_id], (err, result)=>{


        if(err){

            return res.status(500).json({
                message:"Database Error",
                error:err.message
            });

        }


        res.json(result);


    });

};
exports.getClassAttendance = (req,res)=>{

    const class_id = req.params.id;


    const sql = `
    SELECT
        students.name,
        students.email,
        subjects.subject_name,
        attendance.attendance_time,
        attendance.latitude,
        attendance.longitude

    FROM attendance

    JOIN students
    ON attendance.student_id = students.student_id

    JOIN classes
    ON attendance.class_id = classes.class_id

    JOIN subjects
    ON classes.subject_id = subjects.subject_id

    WHERE attendance.class_id = ?
    `;


    db.query(
        sql,
        [class_id],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Database Error"
                });

            }


            res.json(result);

        }
    );

};