const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./api/config/db/mongoDb");

const corsOptions = require("./api/config/corsOptions");

// db connection
connectDB();

// for env
require("dotenv").config();

const app = express();

// Disable 'X-Powered-By' header
app.disable("x-powered-by");

// Enabling CORS
app.use(cors(corsOptions));

// to use json data (post request data) it display data from body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routers
const myRouter = require("./api/router/user");

// use routers
app.get("/", (req, res, next) => {
  let myIp = req.ip?.replace(/^.*:/, "");
  res.status(200).json({
    message: "Home Page",
    port: `http://${myIp}:${process.env.PORT}`,
  });
});

// app.use("/url", myRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Page Not Found!",
    error: "404",
  });
});

// run server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
