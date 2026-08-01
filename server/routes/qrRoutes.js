const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const db = require("../config/db");


router.post("/generate", async (req,res)=>{

    try {


        const { class_id } = req.body;


        const sql = 
        "SELECT * FROM classes WHERE class_id = ?";


        db.query(sql,[class_id], async(err,result)=>{


            if(err){
                return res.status(500).json({
                    message:"Database Error"
                });
            }


            if(result.length === 0){

                return res.status(404).json({
                    message:"Class Not Found"
                });

            }


            const qrData = JSON.stringify({

                class_id: result[0].class_id,
                subject_id: result[0].subject_id,
                created_at: Date.now()

            });


            const qrImage = await QRCode.toDataURL(qrData);


            res.json({

                qr: qrImage,
                data: qrData

            });


        });


    }
    catch(error){

        res.status(500).json({
            message:"QR Generate Failed",
            error:error.message
        });

    }

});


module.exports = router;