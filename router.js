const express = require('express');
const app = express();

const AdminRouter = require("./routes/admin");


app.use("/admin" , AdminRouter);


module.exports = app;