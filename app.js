const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require('express-handlebars');
const connectDB = require('./config/db')

//load configuration
dotenv.config({ path: './config/.env' });

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

//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
