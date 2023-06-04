const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const route = require("./Routes/route");
const { Db } = require("mongodb");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbConnect();
app.use("/api/v1", route);

app.listen(process.env.PORT, ()=> {
    console.log("App is running successfully at")
});