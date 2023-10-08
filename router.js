const express = require('express');
const app = express();

const AdminRouter = require("./routes/admin");
const CandidateRouter = require("./routes/candidate");


app.use("/admin" , AdminRouter);
app.use("/candidate" , CandidateRouter);


module.exports = app;