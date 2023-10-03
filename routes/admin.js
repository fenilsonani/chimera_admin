const express = require('express');
const router = express.Router();

const AdminController = require("../controller/adminController");

router.get("/dashboard" , AdminController.viewDashboard);

module.exports = router;