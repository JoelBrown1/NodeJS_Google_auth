// make an express server
const express = require("express");
// bring in mongoose
const mongoose = require('mongoose');
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
// need to use passport to allow users to log in with google (or other 3rd party services)
const passport = require('passport');
const session = require('express-session');
// add a Mongo store to preserve server state
// takes session as a second property
const MongoStore = require('connect-mongo')(session)


// load config
dotenv.config({path: './config/config.env'});

// loading in the passport config for the test app
//  adding the second is an argument that we can use in the config code
require('./config/passport')(passport)

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

// adding express session middleware
// must go before passport sessions
app.use(session({
  secret: 'keyboard cat', // this can be anything really
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection}) // is the mongo store property
}))

// adding the passport middleware to the app
app.use(passport.initialize());
// passport sessions needs exoress sessions
app.use(passport.session());

// Static folders for images/custom CSS etc...
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server started in ${process.env.NODE_ENV}, on port ${PORT}`));