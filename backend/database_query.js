var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	const sqlPay = "SELECT * FROM transactions JOIN groups ON transactions.groupID = groups.groupID WHERE transactions.groupID = ? and fromID = ? and toID = ?";
	con.query(sqlPay, [1, 1, 2], function (err, result) {
		if (err) throw err;
		console.log(result);
	});
});
