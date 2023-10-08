const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const User = require("./models/User");

const app = express();
const port = process.env.PORT |  3000


// Set the view engine to use Handlebars (hbs)
app.set('view engine', 'hbs');

// Set the views directory to the "views" folder
app.set('views', path.join(__dirname, 'views'));

// Register partials (if needed)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Express session middleware

const secretKey = 'abc123';
app.use(session({
    secret: secretKey, // Replace with a strong secret key
    resave: false, // Don't save the session if it hasn't been modified
    saveUninitialized: true, // Save new sessions
    cookie: { secure: true }, // Set to true for HTTPS
}));


// mongoes connect
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/db_chimera" ,{ family : 4})
.then(() => {
    app.listen(port, () => console.log(`app listening on port ${port}!`));
}).catch((err) => {
    console.log(err);
})

// user create
User.createAdmin();

// listen server without mongoes
// app.listen(port, () => console.log(`app listening on port ${port}!`));


const routes = require("./router")
app.use("/" , routes);
app.get('/', (req, res) => res.send('Hello World!'))





