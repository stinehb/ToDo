const express = require('express');
const db = require('./db.js');
const router = express.Router();
const protect = require("./auth.js");

// endpoints ----------------------------
router.get("/showAllLists", protect, async function(req, res, next) {		

	console.log(res.locals.username);
	console.log(res.locals.userid);

    try {
		let data = await db.getAllToDoLists();
		res.status(200).json(data.rows).end();
	}
	catch(err) {
		next(err);
	}	
});

router.post("/addNewItem", protect, async function(req, res, next) {		

	console.log(res.locals.id);

    try {
		let data = await db.addItemToDoList();
		res.status(200).json(data.rows).end();
	}
	catch(err) {
		next(err);
	}	
});

router.post("/createNewList", protect, async function(req, res, next) {		

	/* console.log(res.locals.username);
	console.log(res.locals.userid); */

    try {
		let data = await db.createToDoList();
		res.status(200).json(data.rows).end();
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