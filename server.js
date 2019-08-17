// import React from 'react'
// import { setCookie, getCookie, removeCookie } from 'react-cookies'
  
const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

//app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// POST http://localhost:4000/axios/userInfo
// parameters sent with 
// app.post('/axios/userInfo', function(req, res) {
//     var subID = req.body.sub;
//     var email = req.body.email

//     res.send(subID + ' ' + email);
// });
// POST http://localhost:4000/axios/userInfo
// parameters sent with 

app.post('/userInfo', function(req, res) {
	const email = req.body.email;
	const sub = req.body.subID;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	//res.send(`${email} | ${sub} | ${firstName} | ${lastName}`);
	
	const sqlCheck = "SELECT COUNT(*) as count from USERS WHERE email = ?";
	//console.log(email + " " + sub + " " + firstName + " " + lastName);
	con.query(sqlCheck, [email], function (err, result) {
		if (err) res.send(err);
		else {
			if (result[0].count == 0) {
				//console.log("R U TROLLING?");
				const sql = "INSERT INTO users (subID, email, firstName, lastName) VALUES (?, ?, ?, ?)";
				//console.log(sub + " " + email);
				con.query(sql, [sub, email, firstName, lastName], function (err, result) {
					if (err) res.send(err);
					else {
						return (result);
						return res.json({
							data: result
						})
					}
				})
			} else {
				return res.json({
					data: [{"exists":true}]
				})
			}
		}
	})
});

app.get('/userInfo/get', (req, res, next) => {
	const email = String(req.query.email)
	con.query("SELECT * FROM users WHERE email = ?", [ email ], (err, result) => {
		if (err) res.send(err);
		else {
			console.log(result);
			return res.json({
				data: result
			})
		}
	});
  });

// adds new group with title "groupTitle," also adds it with user "userID" under USERGROUPS
app.get('/users/groups/add', (req, res) => {
	const {groupTitle, userID } = req.query;
	const sqlGroup = "INSERT INTO groups (groupTitle) VALUES (?)";
	const sqlUserGroup = "INSERT INTO userGroups (groupID, userID) VALUES (?, ?)";

	con.query(sqlGroup, [groupTitle], function (err, result) {
		if (err) res.send(err);
		else {
			const groupID = result.insertId;
			con.query(sqlUserGroup, [groupID, userID], function (err, result) {
				if (err) res.send(err);
				else {
					return res.json({
						data: result
					})
				}
			})
		}
	});
});

// deletes relations with "groupID" from GROUPS, USERGROUPS, TRANSACTIONS, OWES
app.get('/users/groups/delete', (req, res) => {
	const {groupID} = req.query;
	const sqlGroup = "DELETE FROM groups WHERE groupID = ?";

	con.query(sqlGroup, [groupID], function (err, result) {
		if (err) res.send(err);
		else {
			con.query("DELETE FROM userGroups WHERE groupID = ?", [groupID], function (err, result) {
				if (err) res.send(err);
				else {
					con.query("DELETE FROM transactions WHERE groupID = ?", [groupID], function (err, result) {
						if (err) res.send(err);
						else {
							return res.json({
								data: result
							})
							// con.query("DELETE FROM owes WHERE groupID = ?", [groupID], function (err, result) {
							// 	if (err) res.send(err);
							// 	else {
							// 		return res.json({
							// 			data: result
							// 		})
							// 	}
							// })
						}
					})
				}
			})
		}
	});
});

// inserts user with "userID" into group "groupID" in USERGROUPS
app.get('/groups/users/add', (req, res) => {
	const {groupID, userID} = req.query;
	const sql = "INSERT INTO userGroups (groupID, userID) VALUES (?, ?)";
	con.query(sql, [groupID, userID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	})
});

// checks if userID exists based on email. if exists, returns userID and info
app.get('/users/email/exists', (req, res) => {
	const {email} = req.query;
	const sql = "SELECT COUNT(*) as count FROM users WHERE email = ?";
	con.query(sql, [email], function (err, result) {
		if (err) res.send(err);
		else {
			if (result[0].count == 0) {
				return res.json({
					data: [{"exists":false}]
				})
			}
			else {
				const sqlInfo = "SELECT * FROM users WHERE email = ?";
				con.query(sqlInfo, [email], function (err, result) {
					if (err) res.send(err);
					else {
						return res.json({
							data: result
						})
					}
				})
			}
		}
	})
});

// combines above two methods: checks if email has userID. if yes, adds it to group. if not, denied.
app.get('/groups/users/email/add', (req, res) => {
	const {groupID, email} = req.query;
	const sql = "SELECT COUNT(*) as count FROM users WHERE email = ?";
	con.query(sql, [email], function (err, result) {
		if (err) res.send(err);
		else {
			if (result[0].count == 0) {
				res.status(404).send('User not found');
			}
			else {
				const sqlInfo = "SELECT userID as id FROM users WHERE email = ?";
				con.query(sqlInfo, [email], function (err, result) {
					if (err) res.send(err);
					else {
						const userID = result[0].id;
						const sqlInsert = "INSERT INTO userGroups (groupID, userID) VALUES (?, ?)";
						con.query(sqlInsert, [groupID, userID], function (err, result) {
							if (err) res.send(err);
							else {
								const sqlGet = "SELECT * FROM users"
								con.query(sqlGet, function (err, result) {
									if (err) res.send(err);
									else {
										return res.json({
											data: result
										})
									}
								})
								// return res.json({
								// 	data: result
								// })
							}
						})
					}
				})
			}
		}
	})
})

// delete user with "userID" in group "groupID" in USERGROUPS, TRANSACTIONS, OWES
app.get('/groups/users/delete', (req, res) => {
	const {groupID, userID} = req.query;
	const sql = "DELETE FROM userGroups WHERE groupID = ? AND userID = ?";
	con.query(sql, [groupID, userID], function (err, result) {
		if (err) res.send(err);
		else {
			const sql = "DELETE FROM transactions WHERE groupID = ? AND userID = ?";
			con.query(sql, [groupID, userID, userID], function (err, result) {
				if (err) res.send(err);
				else {
					return res.json({
						data: result
					})
					// const sql = "DELETE FROM owes WHERE groupID = ? AND userID = ?";
					// con.query(sql, [groupID, userID, userID], function (err, result) {
					// 	if (err) res.send(err);
					// 	else {
					// 		return res.json({
					// 			data: result
					// 		})
					// 	}
					// })
				}
			})
		}
	})
});

// inserts transaction of 'amount' from 'fromID' to 'toID' in 'groupID' with title 'tranTitle' in TRANSACTIONS
app.get('/transactions/add', (req, res) => {
	const {tranTitle, groupID, fromID, toID, amount} = req.query;
	const sql = "INSERT INTO transactions (tranTitle, groupID, fromID, toID, amount) VALUES (?, ?, ?, ?, ?)";
	con.query(sql, [tranTitle, groupID, fromID, toID, amount], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
			// const sqlSearch = "SELECT COUNT(*) as count FROM owes WHERE ((fromID = ? AND toID = ?) OR (fromID = ? AND toID = ?))";
			// con.query(sqlSearch, [fromID, toID, toID, fromID], function (err, result) {
			// 	if (err) res.send(err);
			// 	else if (result[0].count == 0) {
			// 		const sqlAdd = "INSERT INTO owes (groupID, fromID, toID, netAmount) VALUES (?, ?, ?, ?)";
			// 		con.query(sqlAdd, [groupID, fromID, toID, amount], function (err, result) {
			// 			if (err) res.send(err);
			// 			else {
			// 				return res.json({
			// 					data: result
			// 				})
			// 			}
			// 		})
			// 	} else {
			// 		const sqlEdit = "UPDATE"
			// 	}
			// })
		}
	})
});

// deletes transaction 'tranID' from TRANSACTIONS
app.get('/transactions/delete', (req, res) => {
	const {tranID} = req.query;
	const sql = "DELETE FROM transactions WHERE tranID = ?";
	con.query(sql, [tranID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
			data: result
			})
		}
	})
})

// returns transactions paid from "fromID" to "toID" in "groupID"
// DOES NOT return transactions paid from "toID" to "fromID" in "groupID"
app.get('/transactions/groups/users', (req, res) => {
	const { groupID, fromID, toID } = req.query;
	const sqlPay = "SELECT groups.groupID, groupTitle, tranID, tranTitle, FORMAT(amount, 2) as amount," +
	" fromID, u1.firstName as fromID_firstName, u1.lastName as fromID_lastName," +
	" toID, u2.firstName as toID_firstName, u2.lastname as toID_lastName " +

	" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
	" JOIN users u1 ON transactions.fromID = u1.userID" +
	" JOIN users u2 ON transactions.toID = u2.userID" +
	" WHERE groups.groupID = ? and fromID = ? and toID = ? ORDER BY tranID DESC";
	con.query(sqlPay, [groupID, fromID, toID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	});
});

// returns transactions involving "userID" in "groupID"
app.get('/transactions/groups/user', (req, res) => {
	const { userID, groupID } = req.query;
	//const sql = "SELECT * FROM transactions WHERE (fromID = ? OR toID = ?) AND groupID = ? ORDER BY tranID DESC";
	const sql = "SELECT groups.groupID, groupTitle, tranID, tranTitle, FORMAT(amount, 2) as amount," +
	" fromID, u1.firstName as fromID_firstName, u1.lastName as fromID_lastName," +
	" toID, u2.firstName as toID_firstName, u2.lastname as toID_lastName " +

	" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
	" JOIN users u1 ON transactions.fromID = u1.userID" +
	" JOIN users u2 ON transactions.toID = u2.userID" +
	" WHERE groups.groupID = ? and (fromID = ? OR toID = ?) ORDER BY tranID DESC";
	con.query(sql, [groupID, userID, userID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	})
});

// returns transactions in "groupID"
app.get('/transactions/groups', (req, res) => {
	const {groupID} = req.query;
	//const sql = "SELECT * FROM transactions WHERE groupID = ?";
	
	const sql = "SELECT groups.groupID, groupTitle, tranID, tranTitle, FORMAT(amount, 2) as amount," +
	" fromID, u1.firstName as fromID_firstName, u1.lastName as fromID_lastName," +
	" toID, u2.firstName as toID_firstName, u2.lastname as toID_lastName " +

	" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
	" JOIN users u1 ON transactions.fromID = u1.userID" +
	" JOIN users u2 ON transactions.toID = u2.userID" +
	" WHERE groups.groupID = ? ORDER BY tranID DESC";
	
	con.query(sql, [groupID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	})
})

// returns amount owed in "groupID" between "user1" and "user2"
// in format "fromID" owes "toID" "owedAmount" (owedAmount always positive)
app.get('/owes/groups/users', (req, res) => {
	const { groupID, user1, user2 } = req.query;
	const sqlPay = "SELECT sum(amount) as sum" +
		" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
		" WHERE transactions.groupID = ? and fromID = ? and toID = ?";
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
						data: [{"groupID":groupID, "fromID":user2, "toID":user1, "owedAmount":-owe}]
					})
				}
			});
		}
	});
});

// //Not working rn: returns owes in "groupID"
// app.get('/owe/groups', (req, res) => {
// 	const {groupID} = req.query;
// 	const sqlCount = "SELECT COUNT(*) as count FROM userGroups WHERE groupID = ?";
	
// 	con.query(sqlCount, [groupID], function (err, result) {
// 		if (err) res.send(err);
// 		else {
// 			const count = result[0].count;
// 			const sqlPay = "SELECT groups.groupID, groupTitle, tranID, tranTitle, amount, " +
// 				" fromID, u1.firstName as fromID_firstName, u1.lastName as fromID_lastName," +
// 				" toID, u2.firstName as toID_firstName, u2.lastname as toID_lastName " +

// 				" FROM transactions JOIN groups ON transactions.groupID = groups.groupID" +
// 				" JOIN users u1 ON transactions.fromID = u1.userID" +
// 				" JOIN users u2 ON transactions.toID = u2.userID" +
// 				" WHERE groups.groupID = ? and fromID = ? and toID = ?";
// 			var results = []

// 			for (i = 1; i < count; i++) {
// 				for (j = i+1; j < count+1; j++) {
// 					console.log(i + " " + j);
// 					con.query(sqlPay, [groupID, i, j], function (err, result) {
// 						if (err) res.send(err);
// 						else {
// 							results.push(result);
// 							console.log(i + " " + j);
// 							console.log(results);
// 							if (i == count-1 && j == count) {
// 								console.log("success");
// 								return res.json({
// 									data: results
// 								})
// 							}
// 						}
// 					})
// 				}
// 			}
// 		}
// 	})
// })

// returns groups that "userID" is in
app.get('/groups/users', (req, res) => {
	const {userID} = req.query;
	const sql = "SELECT * FROM userGroups JOIN groups JOIN users ON groups.groupID = userGroups.groupID AND userGroups.userID = users.userID WHERE userGroups.userID = ?";
	con.query(sql, [userID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	})
})

// returns users in "groupID"
app.get('/users/groups', (req, res) => {
	const {groupID} = req.query;
	const sql = "SELECT * FROM userGroups JOIN groups JOIN users ON userGroups.userID = users.userID AND groups.groupID = userGroups.groupID WHERE groups.groupID = ?";
	con.query(sql, [groupID], function (err, result) {
		if (err) res.send(err);
		else {
			return res.json({
				data: result
			})
		}
	})
})

/*Everything below returns table values*/

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

//patrickhaoy's note: Kill server = kill $(lsof -t -i:4000)
app.listen(process.env.PORT || 4000, () => {
    console.log('Success')
});

// Buggy functions which are currently not used

// // returns user info for "userID"
// app.get('/users', (req, res) => {
// 	const { userID } = req.query;
// 	const sql = "SELECT * FROM users WHERE userID = ?";
// 	con.query(sql, [userID], function (err, result) {
// 		if (err) res.send(err);
// 		else {
// 			return res.json({
// 				data: result
// 			})
// 		}
// 	})
// });

// // returns transaction info for "tranID"
// app.get('/transactions', (req, res) => {
// 	const { tranID } = req.query;
// 	const sql = "SELECT * FROM transactions WHERE tranID = ?";
// 	con.query(sql, [tranID], function (err, result) {
// 		if (err) res.send(err);
// 		else {
// 			return res.json({
// 				data: result
// 			})
// 		}
// 	})
// });