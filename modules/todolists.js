const express = require('express');
const db = require('./db.js');
const router = express.Router();
const protect = require("./auth.js");

// endpoints ----------------------------


router.get("/showToDoList/update", protect, async function(req, res, next) {

	let updata = req.updata;
	let userid= res.locals.userid;

	try {
		let data= await db.updateToDoList(updata.heading, userid);
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});


router.get("/showAllLists", protect, async function(req, res, next) {		

	let userid= res.locals.userid;
	

    try {
		let data = await db.getAllToDoLists(userid);
		res.status(200).json(data.rows).end();
	}
	catch(err) {
		next(err);
	}	
});

router.get("/showToDoList", protect, async function(req, res, next) {		

	let userid = res.locals.userid;
	let updata= req.updata;

    try {
		let data = await db.showToDoList(updata.heading, userid);
		res.status(200).json(data.rows).end();
	}
	catch(err) {
		next(err);
	}	
});

router.post("/createNewList", protect, async function(req, res, next) {		

	let updata = req.body;
	let userid = res.locals.userid;

    try {
		let data = await db.createToDoList(updata.heading, updata.content, userid);

		if (data.rows.length > 0) {
			res.status(200).json({msg: "You have successfully added item to to do list."}).end();
		}
	}
	catch(err) {
		next(err);
	}	
});

router.delete("/showAllLists", protect, async function(req,res,next) {
    let updata = req.body;
    try {
        let data = await db.deleteToDoList(updata.id);
        if (data.rows.length > 0) {
			res.status(200).json({msg: "The to do list was deleted succefully"}).end();
		}
		else {
			throw "The to do list couldn't be deleted";
		}	
	}
	catch(err) {
		next(err);
	
    }
});

module.exports = router;