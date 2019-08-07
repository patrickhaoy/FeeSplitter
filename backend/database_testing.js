var mysql = require('mysql');
var query = require('./database_query.js');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	if (err) throw err;
	  console.log("Connected!");

	// Henry Gu pays Patrick Yin $10.28 for Chipotle
	// var sql = "INSERT INTO transactions (title, fromID, toID, amount) VALUES ('Chipotle', 1, 2, 10.28)";
	// con.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log(result);
	// });

	// Patrick Yin pays Henry Gu $20.28 for Chipotle
	// var sql = "INSERT INTO transactions (title, fromID, toID, amount) VALUES ('Chipotle', 2, 1, 20.28)";
	// con.query(sql, function(err, result) {
	// 	if (err) throw err;
	// 	console.log(result);
	// });

	//printTransactionsTable();
/*
	// Create Users Table
	var sql = "CREATE TABLE users (userID INT(255) AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255))";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Users table created");
	});
  
	// Delete Users Table
	con.query("DROP TABLE users", function (err, result) {
		if (err) throw err;
		console.log("Users table deleted");
	});

	// Create Transactions Table
 	var sql = "CREATE TABLE transactions (tranID INT(255) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), fromID INT(255), toID INT(255), amount DEC(65, 2))";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log("Transanctions table created");
  	});

	// Delete Transactions Table
	con.query("DROP TABLE transactions", function (err, result) {
 		if (err) throw err;
 		console.log("Transactions table deleted");
	});

	// Insert "Patrick Yin" into Users Table
	con.query("INSERT INTO users (firstName, lastName) VALUES ('Patrick', 'Yin')", function(err, result) {
		if (err) throw err;
		console.log("Successful Insert: Patrick Yin");
	});
*/
});

//	Print Users Table
function printUsersTable () {
	con.query("SELECT * FROM users", function (err, result) {
		if (err) throw err;
		console.log(result);
	});
}

//	Print Transactions Table
function printTransactionsTable () {
	con.query("SELECT * FROM transactions", function (err, result) {
		if (err) throw err;
		console.log(result);
	});
}




  




