const db = require("../config/db");
const bcrypt = require("bcrypt");


exports.registerStudent = async (req,res)=>{

    const {name,email,password} = req.body;


    const hashedPassword = await bcrypt.hash(password,10);


    const sql =
    "INSERT INTO students(name,email,password) VALUES(?,?,?)";


    db.query(
        sql,
        [name,email,hashedPassword],
        (err,result)=>{

            if(err){
                return res.status(500).json({
                    message:"Registration Failed"
                });
            }


            res.json({
                message:"Student Registered Successfully"
            });

        }
    );

};