require("dotenv").config();
require("./config/db");
const attendanceRoutes = require("./routes/attendanceRoutes");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const qrRoutes = require("./routes/qrRoutes");

const app = express();

app.use(cors());
app.use(express.json());   // 👈 මේක routes වලට කලින්

app.use("/api/auth", authRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
    res.send("SmartAttend Backend Server Running 🚀");
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});