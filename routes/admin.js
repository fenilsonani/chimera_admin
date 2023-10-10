const express = require('express');
const router = express.Router();

const AdminController = require("../controller/adminController");
const authController = require("../controller/authController");
const QuestionSetController = require("../controller/questionSetController");
const candidateController = require("../controller/candidateController");

router.get("/" , authController.checkNotAuthenticated ,  AdminController.viewLogin);
router.get("/dashboard" , authController.checkAuthenticated, AdminController.viewDashboard);
router.get("/ViewQuestionSetForm" , authController.checkAuthenticated, QuestionSetController.viewContactSetForm);
router.get("/ViewQuestionSet" , authController.checkAuthenticated, QuestionSetController.viewContactSet);
router.post("/AddQuestionSet" , authController.checkAuthenticated, QuestionSetController.addContactSet);
router.post("/login" ,authController.login);

// candidates

router.get("/candidates" , authController.checkAuthenticated, candidateController.viewCandidates);


module.exports = router;