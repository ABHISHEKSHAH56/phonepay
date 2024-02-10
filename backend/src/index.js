const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/index");
require("dotenv").config();

const PORT = process.env.PORT;

const setUpAndStartServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", router);
  app.get("/", (req, res) => {
    res.send("it's working ....");
  });

  const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}`)
  );
};

setUpAndStartServer();
