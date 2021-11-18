const express = require('express');
const db = require('./db.js');
const authUtils = require("./auth_utils.js");
const router = express.Router();

//endpoints----------------------------------

// user login ---------------------------------
router.post("/users/login", async function(req, res, next){
    res.status(200).send("Hello from POST - /users/login").end();
});

// list all users -------------------------------
router.get("/users", async function(req, res, next){
   // res.status(200).send("Hello from GET - /users").end();

   try {
       let data = await db.getAllUsers();
       res.status(200).json(data.rows).end();
   }
   catch(err){
       next(err);
   }
});

// create a new user -------------------------------
router.post("/users", async function(req, res, next){
    res.status(200).send("Hello from POST - /users").end();
});

// delete a user -------------------------------
router.delete("/users", async function(req, res, next){
    res.status(200).send("Hello from DELETE - /users").end();
});

//-----------------------------------------------
module.exports = router;