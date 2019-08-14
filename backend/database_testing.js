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

	// // Insert "Patrick Yin", "Henry Gu", "Richard Tang", "Andy Fang", "Alex Ma" into Users Table
	// // SubID values are bogus
	// var names = [
	// 	['1', 'Patrick', 'Yin'],
	// 	['2', 'Henry', 'Gu'],
	// 	['3', 'Richard', 'Tang'],
	// 	['4', 'Andy', 'Fang'],
	// 	['5', 'Alex', 'Ma']
	// ];
	// con.query("INSERT INTO users (subID, firstName, lastName) VALUES ?", [names], function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Successful Insert: users");
	// });

	// // Group1: LA Trip, Group2: East Coast Trip
	// var groups = [
	// 	["LA Trip"],
	// 	["East Coast Trip"]
	// ];
	// con.query("INSERT INTO groups (groupTitle) VALUES ?", [groups], function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Successful Insert: groups");
	// });

	// // 1234 in Group 1, 1345 in Group 2
	// var userGroups = [
	// 	[1, 1], [1, 2], [1, 3], [1, 4],
	// 	[2, 1], [2, 3], [2, 4], [2, 5]
	// ];
	// con.query("INSERT INTO userGroups (groupID, userID) VALUES ?", [userGroups], function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Successful Insert: userGroups");
	// });

	// // LA and East Coast Trip Transactions
	// var transactions = [
	// 	["Scooter Ride", 1, 1, 2, 5],
	// 	["Black Bear Diner", 1, 4, 3, 5],
	// 	["Spicy Noodle", 1, 1, 2, 2.49],
	// 	["Spicy Noodle", 1, 3, 2, 2.49],
	// 	["Met", 2, 4, 5, 12],
	// 	["Red Rooster Dinner", 2, 4, 5, 34.58],
	// 	["BBQ Lunch", 2, 1, 5, 14.3],
	// 	["Met", 2, 1, 5, 19],
	// ];
	// con.query("INSERT INTO transactions (tranTitle, groupID, fromID, toID, amount) VALUES ?", [transactions], function(err, result) {
	// 	if (err) throw err;
	// 	console.log("Successful Insert: transactions")
	// });
});




  




