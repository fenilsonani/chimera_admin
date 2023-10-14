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

router.get("/candidates" , candidateController.viewCandidates);

// Question Sets

router.get("/ViewQuestionSet" , QuestionSetController.viewquestionSets);
router.get("/AddQuestionSet", QuestionSetController.viewQuestionSetForm);
router.get("/questionSet/:id" , QuestionSetController.viewQuestionSet);
router.get("/DeletequestionSet/:id" , QuestionSetController.DeleteQuestionSet);
router.delete("/question/:id" , QuestionSetController.deleteQuestion);
router.get("/ViewQuestionSetForm" , QuestionSetController.viewQuestionSetForm);
router.get("/updateQuestion/:id" , QuestionSetController.updateQuestionPage);
router.post("/AddQuestionSet" , QuestionSetController.addQuestionSet);
router.post('/updateQuestion', QuestionSetController.updateQuestion);


// for api to get question
router.get("/AllquestionSet" , QuestionSetController.getApiQuestionSets);


module.exports = router;