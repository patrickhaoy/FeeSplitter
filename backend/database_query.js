var mysql = require('mysql');
var express = require('express');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

//users.userID, subID, firstName, lastName
con.connect(function(err) {
	const sql = "SELECT FORMAT(amount, 2) FROM transactions WHERE tranID=1"
	con.query(sql, function (err, result) {
		if (err) return err;
		else {
			console.log(result);
		}
	})
});
