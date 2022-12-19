require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

const cookieParser = require("cookie-parser");

const express = require('express');

//USE THIS FOR REACT
const cors = require('cors');


const app = express();

//USE THIS FOR REACT
let whitelist = [process.env.ORIGIN];
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


require("./config")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// default value for title local
const projectName = 'ArchDeco';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

// 👇 Start handling routes here

app.use(
    session({
      secret: '123secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000
      }, // ADDED code below !!!
      store: MongoStore.create({
        mongoUrl: process.env.MONGOURL
      })
    })
  );
  
  app.use(flash());

  app.use(function (req, res, next) {
console.log("Hello-app.js")
console.log(req.session)
    res.locals.theUser = req.session.currentlyLoggedIn;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
  })


// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const Appointments = require('./routes/appointments.routes');
app.use('/appointments', Appointments);

const Services = require('./routes/services.routes');
app.use('/services', Services);



require("./error-handling")(app);


//USE THIS FOR REACT
app.use('*',cors());


module.exports = app;
