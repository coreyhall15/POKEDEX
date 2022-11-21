/////////////////////////////////////////
///////IMPORT DEPENDENCIES
////////////////////////////////////////
require("dotenv").config()//Load ENV Variables
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const express = require('express');

/////////////////////////////////////////
///////ESTABLISH DATABASE CONNECTION
////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Establish connection
mongoose.connect(DATABASE_URL, CONFIG)


/////////////////////////////////////////
///////CREATE APP OBJECT
////////////////////////////////////////
const app = express();
const Pokemon = require('../models/pokemon.js');


// INDEX
app.get('/', (req, res) => {
res.render('index.ejs', { data: Pokemon });
});


// SHOW
app.get('/:id', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.id] });
});