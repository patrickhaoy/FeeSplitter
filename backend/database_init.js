var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	if (err) throw err;
	  console.log("Connected!");
	  
	// Delete Users Table
	con.query("DROP TABLE users", function (err, result) {
		if (err) throw err;
		console.log("Users table deleted");
	});

	// Delete Transactions Table
	con.query("DROP TABLE transactions", function (err, result) {
 		if (err) throw err;
 		console.log("Transactions table deleted");
	});

	// Delete Groups Table
	con.query("DROP TABLE groups", function (err, result) {
 		if (err) throw err;
 		console.log("groups table deleted");
	});

	// Delete userGroups Table
		con.query("DROP TABLE userGroups", function (err, result) {
 		if (err) throw err;
 		console.log("userGroups table deleted");
	});

	// Delete Owes Table
	con.query("DROP TABLE owes", function (err, results) {
		if (err) throw err;
		console.log("owes table deleted")
	})
  
  	var sql = "CREATE TABLE users (userID INT(255) AUTO_INCREMENT PRIMARY KEY, subID VARCHAR(255), email VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255))";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log("Users table created");
  	});
  
 	var sql = "CREATE TABLE transactions (tranID INT(255) AUTO_INCREMENT PRIMARY KEY, tranTitle VARCHAR(255), groupID INT(255), fromID INT(255), toID INT(255), amount DEC(65, 2))";
  	con.query(sql, function (err, result) {
    	if (err) throw err;
    	console.log("Transanctions table created");
  	});

	var sql = "CREATE TABLE groups (groupID INT(255) AUTO_INCREMENT PRIMARY KEY, groupTitle VARCHAR(255))";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Groups table created");
	})

	var sql = "CREATE TABLE userGroups (groupID INT(255), userID INT(255))";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("userGroups table created");
	})

	// var sql = "CREATE TABLE owes (groupID INT(255), fromID INT(255), toID INT(255), netAmount DEC(65, 2))";
	// con.query(sql, function (err, result) {
	// 	if (err) throw err;
	// 	console.log("Owes table created");
	// })
	
});