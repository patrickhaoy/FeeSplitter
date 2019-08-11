var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	const sqlPay = "SELECT * FROM userGroups JOIN groups ON groups.groupID = userGroups.groupID WHERE userID = ?";
	con.query(sqlPay, [5], function (err, result) {
		if (err) throw err;
		console.log(result);
	});
});
