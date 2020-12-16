var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(server);
const content = require("fs").readFileSync(__dirname + "/index.html", "utf8");

io.on("connection", (socket) => {
  /* … */
  console.log("test");
});

let status = {
  skeletonStatus: "",
  time: "",
};

server.listen(port, function () {
  console.log("Webserver läuft und hört auf Port %d", port);
});

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());

app.post("/kinect", function (req, res) {
  status.skeletonStatus = req.body.skeletonStatus;
  status.time = req.body.time;

  try {
    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send;
  }

  app.get("/", (req, res) => {
    if (status) res.send(status);
    else res.send("No Data Available");
  });
});
