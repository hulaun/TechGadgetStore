const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

const connectDb = require("./config/db");
const route = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));

route(app);

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at: http://${HOSTNAME}:${PORT}`);
  connectDb();
});
