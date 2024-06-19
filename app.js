const express = require('express');
const dotenv = require('dotenv');
const app = express();
//load configuration
dotenv.config({path: './config/config.env'})