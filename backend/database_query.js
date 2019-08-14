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
	const sql = "SELECT *" +
	+ " FROM userGroups JOIN groups JOIN users ON userGroups.userID = users.userID AND groups.groupID = userGroups.groupID WHERE groups.groupID = ?";
	con.query(sql, 1, function (err, result) {
		if (err) return err;
		else {
			console.log(result);
		}
	})
});
