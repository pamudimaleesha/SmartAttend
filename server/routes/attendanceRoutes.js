const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");


router.post(
    "/mark",
    attendanceController.markAttendance
);


router.get(
    "/student/:id",
    attendanceController.getStudentAttendance
);


router.get(
    "/class/:id",
    attendanceController.getClassAttendance
);


module.exports = router;