const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db')

//load configuration
dotenv.config({ path: './config/.env' });

//passport config
require('./config/passport')(passport)
connectDB()

const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Handlebars
// app.engine('.hbs',exphbs({ defaultLayout: 'main', extname: '.hbs' }))
// app.set('view engine', '.hbs')
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
  // cookie: {secure:true}
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Static folder
app.use('/public',express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
