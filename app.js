const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
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

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
 
  // cookie: {
  //   maxAge: 1000 * 60 * 60 * 24 // 1 day
  // }
  // store: new MongoStore({mongooseConnection:mongoose.connection})
  // store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),

  cookie: {secure:true}
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Static folder
app.use('/public',express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));


const PORT = process.env.PORT || 3000;

// connectDB().catch(err => {
//   console.error(err);
//   process.exit(1);
  
// })
app.listen(
  PORT,
  console.log(
    `Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
// app.listen(PORT, () => {
//   console.log(`Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`);
// }).on('error', err => {
//   console.error('Failed to start server:', err);
//   process.exit(1);
// });
