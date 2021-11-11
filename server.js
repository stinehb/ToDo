const express = require("express");

const server = express();
const PORT = process.env.PORT || 8080;

server.set("port", PORT);
server.use(express.static("public"));
server.use(express.json());

server.get("/", (req, res, next) => {
	res.status(200).send("Hello World").end();
});

server.post("/", (req, res, next) => {
	res.status(200).end();
});

server.put("/", (req, res, next) => {
	res.status(200).end();
});

server.delete("/", (req, res, next) => {
	res.status(200).end();
});

server.listen(server.get("port"), function () {
	console.log("server running", server.get("port"));
});

//Hallo