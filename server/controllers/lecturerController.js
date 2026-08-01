const db = require("../config/db");


exports.registerLecturer = (req,res)=>{

    const {
        name,
        email,
        password
    } = req.body;


    const sql = `
    INSERT INTO lecturers
    (name,email,password)
    VALUES (?,?,?)
    `;


    db.query(
        sql,
        [
            name,
            email,
            password
        ],
        (err,result)=>{


            if(err){

                return res.status(500).json({
                    message:"Registration Failed",
                    error:err.message
                });

            }


            res.json({

                message:"Lecturer Registered Successfully",
                lecturer_id: result.insertId

            });


        }
    );


};