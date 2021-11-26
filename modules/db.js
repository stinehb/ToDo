const pg = require ('pg');
const dbURI = "postgres://uquzxumayhwmof:39138d8baaa75d160a95fed8009f15160c83bde1b5ca8e702ae1eb3fde29d5f0@ec2-99-81-177-233.eu-west-1.compute.amazonaws.com:5432/dfkqe7m85k4a4j";
const connstring  = process.env.DATABASE_URL || dbURI;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: { rejectUnauthorized: false }
 });

// database methods -------------------------
let dbMethods = {}; //create empty object

// ------------------------------------
dbMethods.getAllToDoLists = function(userid) {
    let sql = "SELECT * FROM todolist WHERE userid = $1";
    let values = [userid];	
	return pool.query(sql, values); //return the promise	
}


dbMethods.showToDoList= function (id, userid) {
    let sql = "SELECT * FROM todolist WHERE id = $1 AND userid = $2";
    let values = [id, userid];
    return pool.query(sql, values);
}
// ------------------------------------
dbMethods.createToDoList = function(heading, items, userid) { 
    
    console.log(heading, items, userid)
    let sql = "INSERT INTO todolist (id, date, heading, items, userid) VALUES(DEFAULT, DEFAULT, $1, $2, $3) returning *";
	let values = [heading, items, userid];	
    return pool.query(sql, values); //return the promise
}

dbMethods.updateToDoList = function (heading, userid) {
    let sql = "UPDATE todolist SET items = items WHERE heading = $1 AND userid = $2 RETURNING *";
    let values= [id, heading, items, userid];
    return pool.query(sql, values);
}

// ------------------------------------
dbMethods.deleteToDoList = function(id) {  
    let sql = "DELETE FROM todolist WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); //return the promise
}

dbMethods.deleteItem = function(id) {  
    let sql = "DELETE items FROM todolist WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
/*dbMethods.getAllUsers = function() {
    let sql = "SELECT id, username FROM users";	
	return pool.query(sql); //return the promise	
}*/

// ------------------------------------
dbMethods.getUser = function(username) {
    let sql = "SELECT * FROM users WHERE username = $1";
    let values = [username];	
	return pool.query(sql, values); //return the promise	
}

// ------------------------------------
dbMethods.createUser = function(username, password, salt) {  
    let sql = "INSERT INTO users (id, username, password, salt) VALUES(DEFAULT, $1, $2, $3) returning *";
	let values = [username, password, salt];	
    return pool.query(sql, values); //return the promise
}

// ------------------------------------
dbMethods.deleteUser = function(id) {  
    let sql = "DELETE FROM users WHERE id = $1 RETURNING *";
	let values = [id];	
    return pool.query(sql, values); //return the promise
}



// export dbMethods -------------------------
module.exports = dbMethods;

