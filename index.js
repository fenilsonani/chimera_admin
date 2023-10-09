const express = require('express');
const session = require('express-session');
const port = process.env.PORT | 3000
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));

const exphbs = require('express-handlebars');
const customHelpers = require('./helpers/custom-helpers');
// const hbs = require('hbs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');



// Register a Handlebars helper function to increment the index
// const hbseng = exphbs.create({
//     extname: 'hbs',
//     helpers: {
//         // Define the incrementIndex helper function
//         incrementIndex: function (value) {
//             return value + 1;
//         },
//     },
//     allowProtoMethodsByDefault: true,
//     allowProtoPropertiesByDefault: true
// });


// Set the view engine to use Handlebars (hbs)
// app.engine('hbs', hbseng.engine);
app.set('view engine', 'ejs');


// Set the views directory to the "views" folder
const flash = require("connect-flash");
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(flash());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Register partials (if needed)
// hbs.registerPartials(path.join(__dirname, 'views', 'partials'));



// Use express-session middleware
const secretKey = 'abc123';
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

// mongoes connect
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/db_chimera", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})
    .then(() => {
        app.listen(port, () => console.log(`app listening on port ${port}!`));
    }).catch((err) => {
    console.log(err);
})


// listen server without mongoes
// app.listen(port, () => console.log(`app listening on port ${port}!`));


// user create
const User = require("./models/User");
User.createAdmin();

const routes = require("./router")
app.use("/", routes);
app.get('/', (req, res) => res.send('Hello World!'))

app.all("*", function (req, res) {
    res.locals = { title: "Error 404" };
    res.render("auth/auth-404", { layout: "layouts/layout-without-nav" });
});






