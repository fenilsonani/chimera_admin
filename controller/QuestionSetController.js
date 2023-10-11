// Import QuestionSet model
const QuestionSet = require('../models/QuestionSet');
const Question = require('../models/Question');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const viewContactSetForm = (req, res) => {
    res.render('QuestionSet', {
        title: 'Question Set',
    });
}


const getAllQuestionSet = async (req, res) => {
    // try {
    //     const questionSets = await QuestionSet.find().populate('questions');
    //     res.render('ViewQuestionSet', {
    //         title: 'View Question Set',
    //         questionSets,
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal Server Error');
    // }

    try {
        const questionSets = await QuestionSet.aggregate([
            {
                $lookup: {
                    from: 'questions', // Assuming your questions collection name is 'questions'
                    localField: 'questions',
                    foreignField: '_id',
                    as: 'questions',
                },
            },
            {
                $addFields: {
                    totalQuestions: {$size: '$questions'}, // Calculate the total number of questions
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%d-%m-%Y', // Define the desired date format
                            date: '$createdAt', // Specify the field to format
                        },
                    },
                    totalQuestions: 1,
                    questions: 1,
                },
            },
        ]);

        // res.render('ViewQuestionSet', {title: 'View Question Set', questionSets});

        return questionSets;

    } catch (error) {
        console.error(error);
        // res.status(500).send('Internal Server Error');
        throw error;
    }
}

const getQuestionSet = async (questionSetId) => {
    try {
        // Retrieve the specific QuestionSet and associated Questions
        const questionSetWithQuestions = await QuestionSet.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(questionSetId), // Use mongoose.Types.ObjectId
                },
            },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questions',
                    foreignField: '_id',
                    as: 'questions',
                },
            },
            {
                $addFields: {
                    totalQuestions: {$size: '$questions'},
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%d-%m-%Y',
                            date: '$createdAt',
                        },
                    },
                    totalQuestions: 1,
                    questions: 1,
                },
            },
        ]);

        if (questionSetWithQuestions.length === 0) {
            return null; // QuestionSet not found
        }
        return questionSetWithQuestions[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const countQuestionSet = async () => {
    const count = await QuestionSet.countDocuments();
    return count;
}
const addQuestionSet = async (req, res) => {
    try {
        const {questionSetName, MultipleChoiceQuestion, question, choice, answer} = req.body;

        const questionSet = new QuestionSet({
            name: questionSetName,
        });

        for (let i = 0; i < question.length; i++) {
            // Determine the question type based on the checkbox
            const questionType = MultipleChoiceQuestion && MultipleChoiceQuestion[i] === 'true'
                ? 'multipleChoice'
                : 'shortAnswer';

            const newQuestion = new Question({
                text: question[i],
                type: questionType,
            });

            if (questionType === 'multipleChoice') {
                newQuestion.options = [];
                // for (let j = i * 4; j < (i + 1) * 4; j++) {
                //     newQuestion.options.push({
                //         text: choice[j],
                //         isCorrect: false,
                //     });
                // }

                for (let j = 0; j < 4; j++) {
                    newQuestion.options.push({
                        text: choice[i * 4 + j],
                        // isCorrect: isCorrect[i * 4 + j] === 'on',
                        isCorrect: false,
                    });
                }
            } else if (questionType === 'shortAnswer') {
                // For shortAnswer questions, save the correct answer as an option
                // newQuestion.options = [{
                //     text: choice[i],
                //     isCorrect: true,
                // }];

            }

            newQuestion.answer = {
                answer: answer[i],
            };

            await newQuestion.save();
            questionSet.questions.push(newQuestion._id);
        }

        await questionSet.save();

        // console.log('Question Set saved successfully');
        res.redirect('/admin/ViewQuestionSet');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const viewquestionSets = async (req, res) => {
    const questionSets = await getAllQuestionSet();
    res.render('ViewquestionSets', {title: 'Question Sets', questionSets});
}


const viewQuestionSet = async (req, res) => {
    const questionSetId = req.params.id;
    const questionSet = await getQuestionSet(questionSetId);

    if (questionSet === null) {
        res.status(404).send('Question Set not found');
        return;
    }

    res.render('ViewQuestionSet', {title: 'View Question Set', questionSet});
}
const viewQuestionSetForm = (req, res) => {
    res.render('AddQuestionSet', {title: 'Add Question Set'});
}


const deleteQuestion = async (req, res) => {
    const questionId = req.params.id;

    try {
        // Step 1: Find the QuestionSet containing the question
        const questionSet = await QuestionSet.findOne({questions: questionId});

        if (!questionSet) {
            console.log("QuestionSet not found.");
            return res.status(200).json({message: "QuestionSet not found."});
        }

        // Step 2: Remove the reference to the question from the QuestionSet
        questionSet.questions.pull(questionId);
        await questionSet.save();

        // Step 3: Delete the question itself
        await Question.findByIdAndDelete(questionId);

        if (questionSet.questions.length === 0) {
            await QuestionSet.findByIdAndDelete(questionSet._id);
            console.log("QuestionSet deleted because it has no more questions.");
        }

        console.log("Question deleted successfully.");
        return res.status(200).json({message: "Question deleted successfully."});
    } catch (error) {
        console.error("Error deleting question:", error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const DeleteQuestionSet = async (req, res) => {
    const questionSetId = req.params.id;

    try {

        const questionSet = await QuestionSet.findOne({_id: questionSetId});

        if (!questionSet) {
            console.log("QuestionSet not found.");
            res.status(200).send("QuestionSet not found.");
        }

        questionSet.questions.forEach(async (questionId) => {
            await Question.findByIdAndDelete(questionId);
        });

        await questionSet.deleteOne();
        // console.log("Deleted QuestionSet successfully.");
        res.redirect('back');

    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).send("Internal Server Error");
    }

}

const getApiQuestionSets = async (req, res) => {
    try {
        const questionSets = await getAllQuestionSet();
        res.status(200).json(questionSets);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const updateQuestionPage = async (req, res) => {
    questionid = req.params.id
    try {
        question = await Question.findById(questionid)
        res.render('updateQuestion', {title: 'Update Question', question})
    } catch (error) {
        console.error(error);
        res.redirect('back').json({message: "Something Wents Wrong"})
    }
}

const updateQuestion = async (req, res) => {
try {
        const {id , question, choice, answer} = req.body;
        const questionid = req.body.id;
        const questionSet = await QuestionSet.findOne({questions: questionid});

        if (!questionSet) {
            console.log("QuestionSet not found.");
            return res.status(200).json({message: "QuestionSet not found."});
        }

        const newQuestion = await Question.findById(questionid);
        newQuestion.text = question;
        newQuestion.options = [];
        newQuestion.answer;

        if (choice){
            for (i=0 ; i<4 ; i++){
                newQuestion.options.push({
                    text: choice[i],
                    // isCorrect: isCorrect[i] === 'on',
                    isCorrect: false,
                });
            }
        }

        newQuestion.answer = {
            answer: answer,
        };

        await newQuestion.save();
        res.redirect('/admin/ViewQuestionSet');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = {
    viewContactSetForm,
    getAllQuestionSet,
    getApiQuestionSets,
    addQuestionSet,
    countQuestionSet,
    viewquestionSets,
    viewQuestionSetForm,
    getQuestionSet,
    viewQuestionSet,
    deleteQuestion,
    DeleteQuestionSet,
    updateQuestionPage,
    updateQuestion
};
