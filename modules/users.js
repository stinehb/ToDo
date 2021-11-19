const express = require('express');
const db = require('./db.js');
const authUtils = require("./auth_utils.js");
const router = express.Router();

//endpoints----------------------------------

// user login ---------------------------------
router.post("/users/login", async function(req, res, next){
    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);
    
    if (cred.username == "" || cred.password == "") {
        res.status(401).json({error: "No username or password"}).end();
        return;
    } 
	try {
		let data = await db.getUser(cred.username);
       // console.log(data);

		if (data.rows.length > 0) {
			let userid= data.rows[0].id;
			let username = data.rows[0].username;
			let password = data.rows[0].password;
			let passwordHash = data.rows[0].hash;
			let salt = data.rows[0].salt;

			let isPasswordAccurate = authUtils.verifyPassword(cred.password, password, salt);

			if(isPasswordAccurate == true) {
				let tok = authUtils.createToken(username, userid);

				res.status(200).json({
					msg: "The login was successful!",
					token:tok
				}).end();

			} else {
				res.status(403).json({error: "Password not correct."}).end();
			}
		}
		else {
				res.status(403).json({error: "User doesnt exist."}).end();
				return;
		}		
	}
	catch(err) {
		next(err);
	}	


});

// list all users -------------------------------
/*router.get("/users", async function(req, res, next){
   // res.status(200).send("Hello from GET - /users").end();

   try {
       let data = await db.getAllUsers();
       res.status(200).json(data.rows).end();
   }
   catch(err){
       next(err);
   }
});*/

// create a new user -------------------------------
router.post("/users", async function(req, res, next){
    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);

    console.log(credString);
    console.log(cred);
    
    if (cred.username == "" || cred.password == "") {
        res.status(401).json({error: "No username or password"}).end();
        return;
    } 

    let hash = authUtils.createHash(cred.password);
    
    try {
		let data = await db.createUser(cred.username, hash.value, hash.salt);

		if (data.rows.length > 0) {
			res.status(200).json({msg: "The user was created succefully"}).end();
		}
		else {
			throw "The user couldn't be created";
		}		
	}
	catch(err) {
		next(err);
	}	
});

// delete a user -------------------------------
router.delete("/users/delete", async function(req, res, next){
    let credString = req.headers.authorization;
    let cred = authUtils.decodeCred(credString);
    
    if (cred.username == "" || cred.password == "") {
        res.status(401).json({error: "No username or password"}).end();
        return;
    } 
	try {
		let data = await db.getUser(cred.username);

		if (data.rows.length > 0) {
			let userid= data.rows[0].id;
			let username = data.rows[0].username;
			let password = data.rows[0].password;
			let passwordHash = data.rows[0].hash;
			let salt = data.rows[0].salt;

			let isPasswordAccurate = authUtils.verifyPassword(cred.password, passwordHash, salt);

			if(isPasswordAccurate == true) {
				let tok = authUtils.createToken(username, userid);
                
                let waitForDeleting = await db.deleteUser(userid);

				res.status(200).json({
					msg: "You have deleted user successfully!",
					token:tok
				}).end();

			} else {
				res.status(403).json({error: "Password not correct."}).end();
			}
		}
		else {
				res.status(403).json({error: "User doesnt exist."}).end();
				return;
		}		
	}
	catch(err) {
		next(err);
	}	

});

//-----------------------------------------------
module.exports = router;