const express = require('express');
const dotenv = require('dotenv');

//load configuration
dotenv.config({ path: './config/config.env' })

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is listening on ${process.env.NODE_ENV} mode on port ${PORT}`));