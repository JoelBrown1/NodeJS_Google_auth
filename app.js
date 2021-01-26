// make an express server
const express = require("express");
// bring in the environmental varialbes
const dotenv = require("dotenv");

// load config
dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started in ${process.env.NODE_ENV}, on port ${PORT}`));