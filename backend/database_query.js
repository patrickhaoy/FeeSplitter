var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	// var sql = "SELECT * FROM users";
	// con.query(sql, [1], function (err, result) {
	// 	if (err) console.log(err);
	// 	else {
	// 		console.log(result);
	// 	}
	// });

	// sql = "SELECT * FROM groups";
	// con.query(sql, [1], function (err, result) {
	// 	if (err) console.log(err);
	// 	else {
	// 		console.log(result);
	// 	}
	// });

	// sql = "SELECT * FROM userGroups";
	// con.query(sql, [1], function (err, result) {
	// 	if (err) console.log(err);
	// 	else {
	// 		console.log(result);
	// 	}
	// });

	// sql = "SELECT * FROM transactions";
	// con.query(sql, [1], function (err, result) {
	// 	if (err) console.log(err);
	// 	else {
	// 		console.log(result);
	// 	}
	// });
});
