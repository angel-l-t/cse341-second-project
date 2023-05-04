// Importing modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Modules in my project
const mongodb = require("./db/connect");
const routes = require("./routes");
const { send } = require("process");

// Creating express app
const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(cors())
  .use("/", routes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
