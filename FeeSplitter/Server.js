var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
	con.query("SELECT * FROM users", function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
	  });
});