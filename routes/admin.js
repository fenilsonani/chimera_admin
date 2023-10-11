const express = require('express');
const router = express.Router();

const AdminController = require("../controller/adminController");
const authController = require("../controller/authController");
const QuestionSetController = require("../controller/QuestionSetController");
const candidateController = require("../controller/candidateController");

router.get("/" , authController.checkNotAuthenticated ,  AdminController.viewLogin);
router.get("/dashboard" , authController.checkAuthenticated, AdminController.viewDashboard);
router.post("/login" ,authController.login);

// candidates

router.get("/candidates" , authController.checkAuthenticated, candidateController.viewCandidates);

// Question Sets

router.get("/ViewQuestionSet" , authController.checkAuthenticated, QuestionSetController.viewquestionSets);
router.get("/AddQuestionSet" , authController.checkAuthenticated, QuestionSetController.viewQuestionSetForm);
router.get("/questionSet/:id" , authController.checkAuthenticated, QuestionSetController.viewQuestionSet);
router.get("/DeletequestionSet/:id" , authController.checkAuthenticated, QuestionSetController.DeleteQuestionSet);
router.delete("/question/:id" , authController.checkAuthenticated, QuestionSetController.deleteQuestion);
router.get("/ViewQuestionSetForm" , authController.checkAuthenticated, QuestionSetController.viewQuestionSetForm);
router.get("/updateQuestion/:id" , authController.checkAuthenticated, QuestionSetController.updateQuestionPage);
router.post("/AddQuestionSet" , authController.checkAuthenticated, QuestionSetController.addQuestionSet);
router.post('/updateQuestion' , authController.checkAuthenticated, QuestionSetController.updateQuestion);


// for api to get question
router.get("/AllquestionSet" , QuestionSetController.getApiQuestionSets);


module.exports = router;