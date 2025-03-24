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

const HOST = process.env.HOSTNAME;
const PORT = process.env.PORT;

app.listen(PORT, HOST, () => {
  console.log(`Server running at: http://${HOST}:${PORT}`);
  connectDb();
});
