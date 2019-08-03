var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {	
	//owes(1, 2);
});

function owes (user1, user2) {
	var sqlPay = "SELECT SUM(amount) AS sum FROM transactions WHERE fromID = ? and toID = ?";
	var pay, receive;
	
	con.query(sqlPay, [user1, user2], function (err, result) {
		if (err) throw err;
		pay = result
		console.log(pay[0].sum);
	});

	con.query(sqlPay, [user2, user1], function (err, result) {
		if (err) throw err;
		receive = result;
		console.log(receive[0].sum);
		console.log((pay[0].sum - receive[0].sum).toFixed(2));
	});
}

function findUserID (firstName, lastName) {
	var sqlFindUserID = "SELECT userID FROM users WHERE firstName = ? AND lastName = ?";
	con.query(sqlFindUserID, [firstName, lastName], function (err, result) {
		if (err) throw err;
		console.log(result);
	});
}