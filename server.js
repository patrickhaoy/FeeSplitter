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

app.get('/groups/users/transactions', (req, res) => {
	const { groupID, fromID, toID } = req.query;
	const sqlPay = "SELECT * FROM transactions JOIN groups ON transactions.tranID = groups.tranID WHERE groupID = ? and fromID = ? and toID = ?";
	con.query(sqlPay, [groupID, fromID, toID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	});
});

app.get('/groups/users/owe', (req, res) => {
	const { groupID, user1, user2 } = req.query;
	const sqlPay = "SELECT SUM(amount) AS sum FROM transactions WHERE groupID = ? and fromID = ? and toID = ?";
	var pay, receive;
	con.query(sqlPay, [groupID, user1, user2], function (err, result) {
		if (err) res.send(err);
		else {
			pay = result;
			con.query(sqlPay, [groupID, user2, user1], function (err, result) {
				if (err) res.send(err);
				else {
					receive = result; 
					const owe = (pay[0].sum - receive[0].sum).toFixed(2);
					if (owe >= 0) {
						return res.json({
							data: [{"groupID":groupID, "fromID":user1, "toID":user2, "owedAmount":owe}]
						})
					}
					return res.json({
						data: [{"groupID":groupID, "fromID":user2, "toID":user1, "owedAmount":owe}]
					})
				}
			});
		}
	});
});

//patrickhaoy's note: Kill server = kill $(lsof -t -i:4000)
app.listen(process.env.PORT || 4000, () => {
    console.log('Success')
});