
const express = require("express");
const mongoose  = require("mongoose");
const cors = require("cors");
const dotenv  = require("dotenv");

dotenv.config();//get .env config

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log("Server running")))
  .catch((err) => console.error(err));