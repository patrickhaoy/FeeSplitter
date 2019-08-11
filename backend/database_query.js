var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	const sqlPay = "SELECT groups.groupID, groupTitle, tranID, tranTitle, amount, " +
		" fromID, u1.firstName as fromID_firstName, u1.lastName as fromID_lastName," +
		" toID, u2.firstName as toID_firstName, u2.lastname as toID_lastName " +

		" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
		" JOIN users u1 ON transactions.fromID = u1.userID" +
		" JOIN users u2 ON transactions.toID = u2.userID" +
		" WHERE groups.groupID = ? and fromID = ? and toID = ?";
	con.query(sqlPay, [1, 1, 2], function (err, result) {
		if (err) throw err;
		console.log(result);
	});
});
