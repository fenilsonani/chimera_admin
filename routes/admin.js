const express = require('express');
const router = express.Router();

const AdminController = require("../controller/adminController");
const authController = require("../controller/authController");

router.get("/" , authController.checkNotAuthenticated ,  AdminController.viewLogin);
router.get("/dashboard" , authController.checkAuthenticated, AdminController.viewDashboard);
router.post("/login" ,authController.login);


module.exports = router;