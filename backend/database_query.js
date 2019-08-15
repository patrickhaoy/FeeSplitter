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
	const sqlCount = "SELECT COUNT(*) as count FROM userGroups WHERE groupID = ?";
	
	con.query(sqlCount, [1], function (err, result) {
		if (err) throw err;
		else {
			const count = result[0].count;
			const sqlPay = "SELECT groups.groupID, groupTitle, tranID, tranTitle, amount, " +
				" fromID, u1.firstName as fromID_firstName, u1.lastName as fromID_lastName," +
				" toID, u2.firstName as toID_firstName, u2.lastname as toID_lastName " +

				" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
				" JOIN users u1 ON transactions.fromID = u1.userID" +
				" JOIN users u2 ON transactions.toID = u2.userID" +
				" WHERE groups.groupID = ? and fromID = ? and toID = ?";
			var results = [];

			for (i = 0; i < count; i++) {
				for (j = 1; j < count; j++) {
					con.query(sqlPay, [1, i, j], function (err, result) {
						if (err) throw err;
						else {
							results.push(result);
							console.log(results);
						}
					})
				}
			}
		}
	})
});
