const express = require("express");

const server = express();
const PORT = process.env.PORT || 3000;

const todolists = require("./modules/todolists.js");
const users = require("./modules/users.js");

server.set("port", PORT);
server.use(express.static("public"));
server.use(express.json());

server.use(todolists);
server.use(users);



server.listen(server.get("port"), function () {
	console.log("server running", server.get("port"));
});