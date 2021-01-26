// make an express server
const express = require("express");
// path is a core NODEJS module 
const path = require('path');
// bring in the environmental varialbes
const dotenv = require("dotenv");
// morgan logs information when requesting a route or page 
const morgan = require('morgan');
// template engine
var exphbs  = require('express-handlebars');
// connect to the database
const connectDB = require('./config/db');


// load config
dotenv.config({path: './config/config.env'});

// connect to the db
connectDB();

const app = express();

// middleware for the server:
if (process.env.NODE_ENV === 'develop') {
  app.use(morgan('dev'));
}
// Handlebars
app.engine(
  '.hbs', 
  exphbs({
    defaultLayout: 'main', 
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');

// Static folders for images/custom CSS etc...
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server started in ${process.env.NODE_ENV}, on port ${PORT}`));