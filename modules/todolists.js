const express = require('express');
const db = require('./db.js');
const router = express.Router();
const protect = require("./auth.js");
const { getAllToDoLists } = require('./db.js');

// endpoints ----------------------------


router.put("/showToDoList/update", protect, async function(req, res, next) {

	let items = req.updata;
	let id= req.query.id;

	try {
		let data= await db.updateToDoList(items, id);
		res.status(200).json(data.rows).end();
	}
	catch(err){
		next(err);
	}
});


router.get("/showAllLists", protect, async function(req, res, next) {		

	let listeid = req.query.listeid;

	if (listeid) {
		//kall getListe i db.js
	}
	else {
		//kall getAllToDoLists i db.js
	}
	
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

	// let userid = res.locals.userid;
	// let updata= req.body;
	let listID= req.query.id;
	console.log(listID);

    try {
		// let data = await db.showToDoList(updata.id, userid);
		let data = await db.showToDoList(listID);
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