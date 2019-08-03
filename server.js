const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
var app = express();

const SELECT_ALL_USERS = 'SELECT * FROM users';
const SELECT_ALL_TRANSACTIONS = 'SELECT * FROM transactions'

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

app.listen(process.env.PORT || 4000, () => {
    console.log('Success')
});