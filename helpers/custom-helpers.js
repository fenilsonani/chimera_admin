// helpers/custom-helpers.js

const Handlebars = require('handlebars');

Handlebars.registerHelper('incrementIndex', function (index) {
    return index + 1;
});

module.exports = Handlebars;
