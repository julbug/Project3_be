// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

//USE THIS FOR REACT
const cors = require('cors');


const app = express();

//USE THIS FOR REACT
let whitelist = ['http://localhost:3000'];
let corsOptions = {
    origin: (origin, callback)=>{
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },credentials: true
}

app.use(cors(corsOptions));

//==========================================
const session = require('express-session');
const MongoStore = require('connect-mongo');
//==========================================

let flash = require('connect-flash');

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = 'Project3';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here

app.use(
    session({
      secret: '123secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 600000
      }, // ADDED code below !!!
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/Project3'
      })
    })
  );
  
  app.use(flash());

  app.use(function (req, res, next) {
    // im making a template variable called theUser and imequalling it to 
    // the user object in the session
    res.locals.theUser = req.session.currentlyLoggedIn;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
  })



// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const Appointments = require('./routes/appointments.routes');
app.use('/appointments', Appointments);

const Services = require('./routes/services.routes');
app.use('/services', Services);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


//USE THIS FOR REACT
app.use('*',cors());


module.exports = app;
