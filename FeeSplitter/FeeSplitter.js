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
  
  var sql = "CREATE TABLE users (id INT(255), firstName VARCHAR(255), lastName VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Users table created");
  });
  
  var sql = "CREATE TABLE transactions (tranID INT(255), title VARCHAR(255), fromID INT(255), toID INT(255), cost INT(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Transanctions table created");
  });
  
});