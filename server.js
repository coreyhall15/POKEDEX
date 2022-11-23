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


//Public Folder
app.use(express.static('public'))

/////////////////////////////////////////
///////MIDDLEWARE
////////////////////////////////////////
app.use(express.urlencoded( {extended: true} ))
app.use(methodOverride("_method"))

// INDEX
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { data: Pokemon });
    });
    
    // NEW
    app.get("/pokemon/new", (req, res) => {
        res.render("new.ejs")
      })
      
      // DELETE
    
      app.delete("/pokemon/:id", (req, res) => {
        console.log("delete route")
        console.log(req.params.id)
        Pokemon.splice(req.params.id,1);
            res.redirect("/pokemon")
      })
    
      // UPDATE
    app.put("/pokemon/:id", (req, res) => {
      console.log(req.body)
      console.log(req.body.stats[0])
      
    
      Pokemon[req.params.id] =   {
        name:req.body.name,
        img:req.body.img,
        type:req.body.type,
        stats:{
        hp:req.body.stats[0],
        attack:req.body.stats[1],
        defense:req.body.stats[2],
        spattack:req.body.stats[3],
        spdefense:req.body.stats[4],
        speed:req.body.stats[5]
      }}
    
      console.log(req.body)
      //Pokemon[req.params.id] =req.body.pk
      res.redirect(`/pokemon/${req.params.id}`);
    })


    // CREATE
app.post("/pokemon", (req, res) => {
    console.log(req.body)
    let newPokemon = {
      name: req.body.name,
      img:req.body.img,
      type:req.body.type,
      stats:{
        hp:req.body.hp,
        attack:req.body.attack,
        defense:req.body.defense,
        spattack:req.body.spattack,
        spdefense:req.body.spdefense,
        speed:req.body.speed
    }
  }
    Pokemon.push(newPokemon)
    res.redirect("/pokemon")
    })
  
  
  // EDIT
  app.get("/pokemon/:id/edit", (req, res) => {
      res.render("edit.ejs", { data: Pokemon[req.params.id],
      index:req.params.id })
  
   
  })
  
  
  
  // SHOW
  app.get('/pokemon/:id', (req, res) => {
  res.render('show.ejs', { data: Pokemon[req.params.id],
                          index: req.params.id });
  });
  
app.listen(PORT, () => console.log('Bands will make her dance on port: ${PORT}'))