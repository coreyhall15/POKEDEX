/////////////////////////////////////////
///////IMPORT DEPENDENCIES
////////////////////////////////////////
require("dotenv").config()//Load ENV Variables
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const express = require('express');
const PORT = process.env.PORT
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


//Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", ()=> console.log("connected to Mongoose"))
.on("close", ()=> console.log("disconnected to Mongoose"))
.on("error", (error)=> console.log("error"))



/////////////////////////////////////////
///////OUR MODEL
////////////////////////////////////////



/////////////////////////////////////////
///////CREATE APP OBJECT
////////////////////////////////////////
const app = express();
const Pokemon = require('./models/pokemon.js');


// INDEX
app.get('/', (req, res) => {
res.send("your server is running");
});


// SHOW
app.get('/:id', (req, res) => {
res.render('show.ejs', { data: Pokemon[req.params.id] });
});


app.listen(PORT, () => console.log('Bands will make her dance on port: ${PORT}'))