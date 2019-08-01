var mysql = require('mysql');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
//  var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255))";
//  con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log("Table created");
//  });
  
});