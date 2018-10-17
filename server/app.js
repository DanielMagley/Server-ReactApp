require("dotenv").config();

const express = require("express");
const app = express();
const sequelize = require("./db");
const gameInfo = require("./controllers/gamecontrollers");
const user = require("./controllers/usercontrollers");
const bodyParser = require("body-parser");

sequelize.sync();
app.use(bodyParser.json());
app.use(require("./middleware/headers"));

app.use("/mdb/gameinfo", gameInfo);
app.use("/mdb/user", user);

app.listen(3000, () => console.log("App is listneing on 3000"));
