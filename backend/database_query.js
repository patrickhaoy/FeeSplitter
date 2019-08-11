var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	const sqlPay = "SELECT sum(amount) as sum FROM transactions JOIN groups ON transactions.groupID = groups.groupID WHERE transactions.groupID = ? and fromID = ? and toID = ?";
	var pay, receive;
	con.query(sqlPay, [1, 1, 2], function (err, result) {
		if (err) console.log(err);
		else {
			pay = result;
			con.query(sqlPay, [1, 2, 1], function (err, result) {
				if (err) console.log(err);
				else {
					receive = result; 
					const owe = (pay[0].sum - receive[0].sum).toFixed(2);
					if (owe >= 0) {
						console.log({
							data: [{"groupID":1, "fromID":1, "toID":2, "owedAmount":owe}]
						})
					} else {
						console.log({
						data: [{"groupID":1, "fromID":2, "toID":1, "owedAmount":-owe}]
					})
					}
				}
			});
		}
	});
});
