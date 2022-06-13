const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');
require("dotenv").config({
    path: path.join(__dirname, "../.env")
   });
const userRoutes = require("./routes/user");
const servicioRoutes = require("./routes/servicio");
const eventRoutes = require("./routes/event");
const citaRoutes = require("./routes/cita");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', userRoutes);
app.use('/api', servicioRoutes);
app.use('/api', eventRoutes);
app.use('/api', citaRoutes);


// routes

app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// mongoDB connection

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
  // Check if token has expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});

app.listen(port, () => console.log("server listening on port", port));
