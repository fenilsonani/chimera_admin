const viewContactSet = (req, res) => {
    res.render('QuestionSet', {
        title: 'Question Set',
    });
}

const addContactSet = (req, res) => {
    console.log(req.body);
    res.send(req.body);
}

module.exports = { viewContactSet, addContactSet };
