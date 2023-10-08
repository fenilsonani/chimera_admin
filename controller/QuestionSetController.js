// Import QuestionSet model
const QuestionSet = require('../models/QuestionSet');
const Question = require('../models/Question');

const viewContactSet = (req, res) => {
    res.render('QuestionSet', {
        title: 'Question Set',
    });
}

const addContactSet = async (req, res) => {
    try {
        const {questionSetName, MultipleChoiceQuestion, question, choice , answer} = req.body;

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
                        isCorrect:false,
                    });
                }
            } else if (questionType === 'shortAnswer') {
                // For shortAnswer questions, save the correct answer as an option
                // newQuestion.options = [{
                //     text: choice[i],
                //     isCorrect: true,
                // }];

            }

            newQuestion.answer = [{
                answer: answer[i],
            }];

            await newQuestion.save();
            questionSet.questions.push(newQuestion._id);
        }

        await questionSet.save();

        res.send('Question Set saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {viewContactSet, addContactSet};