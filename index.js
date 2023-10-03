const express = require('express');
const hbs = require('hbs');
const path = require('path');

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


// mongoes connect

// const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://localhost:27017/whatsapp_no" ,{ family : 4})
// .then(() => {
//     app.listen(port, () => console.log(`Whatsapp app listening on port ${port}!`));
// }).catch((err) => {
//     console.log(err);
// })

// listen server without mongoes
app.listen(port, () => console.log(`app listening on port ${port}!`));


const routes = require("./router")
app.use("/" , routes);
app.get('/', (req, res) => res.send('Hello World!'))





