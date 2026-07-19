const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/issues", require("./routes/issueRoutes"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🌿 Green Campus AI Backend Running Successfully!"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});