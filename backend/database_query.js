var mysql = require('mysql');
var express = require('express');

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

//users.userID, subID, firstName, lastName
con.connect(function(err) {
});
