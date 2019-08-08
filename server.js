const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
var app = express();

const SELECT_ALL_USERS = 'SELECT * FROM users';
const SELECT_ALL_TRANSACTIONS = 'SELECT * FROM transactions';
const SELECT_ALL_GROUPS = 'SELECT * FROM groups';
const SELECT_ALL_USERGROUPS = 'SELECT * FROM userGroups';

var con = mysql.createConnection({
	host: "den1.mysql6.gear.host",
	user: "feesplitter",
	password: "Tj2vQV?_y564",
	database: "feesplitter"
});

con.connect(err => {
    if(err) {
        return err;
    }
});
 
app.use(cors());

app.get('/', (req, res) => {
    con.query(SELECT_ALL_USERS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/users', (req, res) => {
    con.query(SELECT_ALL_USERS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/transactions', (req, res) => {
    con.query(SELECT_ALL_TRANSACTIONS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/usergroups', (req, res) => {
    con.query(SELECT_ALL_USERGROUPS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

app.get('/groups', (req, res) => {
    con.query(SELECT_ALL_GROUPS, (err, results) => {
        if(err) return res.send(err);
        else {
            return res.json({
                data: results
            })
        }
    })
});

// app.get('/users/owe', (req, res) => {
// 	const { user1, user2 } = req.query;
// 	const sqlPay = "SELECT SUM(amount) AS sum FROM transactions WHERE fromID = ? and toID = ?";
// 	var pay, receive;
// 	con.query(sqlPay, [user1, user2], function (err, result) {
// 		if (err) res.send(err);
// 		else {
// 			pay = result;
// 			con.query(sqlPay, [user2, user1], function (err, result) {
// 				if (err) res.send(err);
// 				else {
// 					receive = result; 
// 					res.send((pay[0].sum - receive[0].sum).toFixed(2));
// 				}
// 			});
// 		}
// 	});
// });

app.listen(process.env.PORT || 4000, () => {
    console.log('Success')
});