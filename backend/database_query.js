var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	const sql = "SELECT * FROM userGroups JOIN groups ON groups.groupID = userGroups.groupID WHERE groups.groupID = ?";
	con.query(sql, [1], function (err, result) {
		if (err) console.log(err);
		else {
			console.log(result);
		}
	});
});
