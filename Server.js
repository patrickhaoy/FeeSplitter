var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
//	con.query("INSERT INTO users (firstName, lastName) VALUES ('Patrick', 'Yin')", function(err, result) {
//		if (err) throw err;
//		console.log("Successful Insert: Patrick Yin")
//	});
	
	// con.query("SELECT * FROM users", function (err, result, fields) {
	//     if (err) throw err;
	//     console.log(result);
	//   });
	//findUserID("Patrick", "Yin")
	
});

function owes (user1, user2) {
	var sql1to2 = "SELECT SUM(amount) FROM users JOIN transactions ON userID = fromID"
	var sql2to1 = "SELECT SUM(amount FROM users JOIN transactions ON userID = toID"

}

function findUserID (firstName, lastName) {
	var sqlFindUserID = "SELECT userID FROM users WHERE firstName = ? AND lastName = ?"
	con.query(sqlFindUserID, [firstName, lastName], function (err, result) {
		if (err) throw err;
		console.log(result)
	});
}