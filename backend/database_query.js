var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	//console.log(owes(1, 2));
	console.log(netOwes(1, 2));
	//netOwes(1, 2);
});
/*function owes (user1, user2, ) {
	var sqlPay = "SELECT SUM(amount) AS sum FROM transactions WHERE fromID = ? and toID = ?";
	const pay = await con.query(sqlPay, [user1, user2], function (err, result) {
		if (err) callback(false);
		else return callback(result[0].sum);
	});
}*/

function netOwes (user1, user2) {
	var sqlPay = "SELECT SUM(amount) AS sum FROM transactions WHERE fromID = ? and toID = ?";
	var pay, receive;
	con.query(sqlPay, [user1, user2], function (err, result) {
		if (err) throw err;
		pay = result;
		con.query(sqlPay, [user2, user1], function (err, result) {
			if (err) throw err;
			receive = result; 
			return ((pay[0].sum - receive[0].sum).toFixed(2));
		});
	});

	/*con.query(sqlPay, [user1, user2], function (err, result) {
		if (err) throw err;
		pay = result
		console.log(pay[0].sum);
		//console.log("2");
	});
	//console.log("3");
	con.query(sqlPay, [user2, user1], function (err, result) {
		if (err) throw err;
		receive = result;
		console.log(receive[0].sum);
		//console.log((pay[0].sum - receive[0].sum).toFixed(2));
		//console.log("4");
	});
	//console.log("5");
	console.log(pay[0].sum + " " + receive[0].sum);
	//return ((pay[0].sum - receive[0].sum).toFixed(2));*/
}

function findUserID (firstName, lastName) {
	var sqlFindUserID = "SELECT userID FROM users WHERE firstName = ? AND lastName = ?";
	con.query(sqlFindUserID, [firstName, lastName], function (err, result) {
		if (err) throw err;
		console.log(result);
	});
}