const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db/mongoDb");
const http = require("http");

const corsOptions = require("./config/corsOptions");

// db connection
connectDB();

// for env
require("dotenv").config();

const app = express();

// for socket enable or disable
const enableSocketIO = process.env.ENABLE_SOCKET_IO === "true";

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

// Import socket.io setup
const initializeSocketServer = require("./socket/socketServer");

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
initializeSocketServer(server);

server.listen(process.env.PORT, () => {
  console.log(`Server started with WebSocket on port ${process.env.PORT}`);
});
