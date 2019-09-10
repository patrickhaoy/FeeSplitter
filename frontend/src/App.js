import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Clear from "@material-ui/icons/Clear";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { Select } from "antd";
import { transcode } from "buffer";

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groupID: props.groupID,
      userID: props.userID,
      emailInput: "",
      editMode: false,
      editText: "Edit"
    };
    this.getUsers = this.getUsers.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.updateEmailInput = this.updateEmailInput.bind(this);
    this.getUserEmail = this.getUserEmail.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.deleteRowUser = this.deleteRowUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        groupID: nextProps.groupID,
        userID: nextProps.userID
      },
      function() {
        this.getUsers();
      }
    );
  }

  getUsers() {
    fetch(
      "https://fee-splitter.herokuapp.com/users/groups?groupID=" +
        this.state.groupID
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          users: response.data
        })
      );
  }

  renderUsers = ({ user_id, firstName }) => (
    <div key={user_id}>{firstName}</div>
  );

  handleToggle() {
    console.log("toggled");
  }

  getUserEmail() {
    //var popup = new Boolean(false);
    console.log(this.state.emailInput);
    fetch(
      "https://fee-splitter.herokuapp.com/groups/users/email/add?groupID=" +
        this.state.groupID +
        "&email=" +
        this.state.emailInput
    )
      .then(response => response.json())
      //.then(response => console.log("Success:", JSON.stringify(response)))
      .then(response => this.getUsers())
      .then(response => this.setState({ emailInput: "" }))
      .catch((this.togglePopup = this.togglePopup.bind(this)));

    //console.log(popup)
    //this.getUsers();
    /*
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch((this.togglePopup = this.togglePopup.bind(this)));
      */
  }

  toggleEditMode() {
    this.setState(
      {
        editMode: !this.state.editMode
      },
      function() {
        if (this.state.editMode) {
          this.setState({
            editText: "Done"
          });
        } else {
          this.setState({
            editText: "Edit"
          });
        }
      }
    );
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
      //showPopup:
    });
  }

  updateEmailInput(e) {
    this.setState({
      emailInput: e.target.value
    });
  }

  deleteRowUser(userID) {
    fetch(
      "https://fee-splitter.herokuapp.com/groups/users/delete?groupID=" +
        this.state.groupID +
        "&userID=" +
        userID
    )
      .then(response => response.json())
      .then(response => this.getUsers());
  }

  //[checked, setChecked] = React.useState([1]);

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          width: "20%",
          margin: "1em",
          padding: "0.5em"
        }}
        className="Users"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="IconButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" className="Title">
              Users
            </Typography>
            <Button onClick={this.toggleEditMode} color="inherit">
              {this.state.editText}
            </Button>
          </Toolbar>
        </AppBar>
        <Paper style={{ maxHeight: 300, overflow: "auto" }}>
          <ListItem>
            <TextField
              value={this.state.emailInput}
              id="standard-bare"
              placeholder="add friend's email"
              margin="normal"
              onChange={this.updateEmailInput}
              inputProps={{ "aria-label": "bare" }}
            />
            <div>
              {/*<button onClick={this.togglePopup.bind(this)}> Add</button>*/}
              <ListItemText id="addEmailButton" onClick={this.getUserEmail}>
                Add
              </ListItemText>
              {this.state.showPopup ? (
                <AddUsersPopup
                  text='Click "Close Button" to hide popup'
                  closePopup={this.togglePopup.bind(this)}
                />
              ) : null}
            </div>
          </ListItem>
          <List>
            {this.state.users.map(user => {
              const labelId = `${user.userID}`;
              if (this.state.editMode) {
                return (
                  <ListItem key={user} button>
                    <ListItemText id={labelId} primary={user.firstName} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="start"
                        className="IconButton"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => this.deleteRowUser(labelId)}
                      >
                        <Clear />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem key={user} button>
                    <ListItemText id={labelId} primary={user.firstName} />
                  </ListItem>
                );
              }
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

class AddUsersPopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner" style={{ textAlign: "center" }}>
          <div className="popup_header">
            <h1>User Not Registered</h1>
          </div>
          <h5 align="center">
            This email has not been registered yet. Please have them register
            with FeeSplitter first.{" "}
          </h5>
          <Button type="button" onClick={this.props.closePopup}>
            Close
          </Button>
        </div>
      </div>
    );
  }
}

// class AddUsersPopupSuccess extends React.Component {
//   render() {
//     return (
//       <div className="popup">
//         <div className="popup_inner" style={{ textAlign: "center" }}>
//           <div className="popup_header">
//             <h1>Success!</h1>
//           </div>
//           <h5 align="center">
//             Refresh page to see changes.{" "}
//           </h5>
//         </div>
//       </div>
//     );
//   }
// }

const { Option } = Select;

class AddTransactionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groupID: props.groupID,
      tranTitle: "",
      senders: [],
      recipients: [],
      tranAmount: 0
    };
    this.getUsers = this.getUsers.bind(this);
    this.handleAddTransaction = this.handleAddTransaction.bind(this);
    this.updateTranTitleInput = this.updateTranTitleInput.bind(this);
    this.handleSenderChange = this.handleSenderChange.bind(this);
    this.handleRecipientChange = this.handleRecipientChange.bind(this);
    this.updateAmountInput = this.updateAmountInput.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupID: nextProps.groupID
    });

    this.getUsers();
  }

  updateTranTitleInput(e) {
    this.setState({
      tranTitle: e.target.value
    });
  }

  getTranTitle() {
    console.log(this.state.tranTitle);
  }

  getSenders() {}

  getRecpients() {}

  getUsers() {
    fetch(
      "https://fee-splitter.herokuapp.com/users/groups?groupID=" +
        this.state.groupID
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          users: response.data
        })
      );
  }

  handleAddTransaction() {
    //fromID, toID, amount
    this.props.addTransaction(
      this.state.tranTitle,
      this.state.groupID,
      this.state.senders,
      this.state.recipients,
      this.state.tranAmount
    );
  }

  handleSenderChange(value) {
    value = value.map(Number);
    this.setState(
      {
        senders: value
      },
      function() {
        console.log(this.state.senders);
      }
    );
  }

  handleRecipientChange(value) {
    value = value.map(Number);
    this.setState(
      {
        recipients: value
      },
      function() {
        console.log(this.state.recipients);
      }
    );
  }

  updateAmountInput(e) {
    this.setState({
      tranAmount: e.target.value
    });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="popup_header">
            <h1>Add a Transaction</h1>
          </div>
          <TextField
            style={{ width: "80%", marginBottom: "1em" }}
            placeholder="name of transaction"
            margin="normal"
            onChange={this.updateTranTitleInput}
            inputProps={{ "aria-label": "bare" }}
          />
          <div>
            <span style={{ color: "black", margin: "1em" }}>From</span>
            <Select
              mode="multiple"
              style={{ width: "30%" }}
              placeholder="select payers"
              onChange={this.handleSenderChange}
              optionLabelProp="label"
            >
              {this.state.users.map(user => {
                const labelId = `${user.userID}`;
                const fullName = `${user.firstName} ${user.lastName}`;
                return (
                  <Option value={labelId} label={fullName}>
                    <span role="img" aria-label={fullName}>
                      {" "}
                    </span>
                    {fullName}
                  </Option>
                );
              })}
            </Select>
            <span style={{ color: "black", margin: "1em" }}>to</span>
            <Select
              mode="multiple"
              style={{ width: "30%" }}
              placeholder="select recipients"
              onChange={this.handleRecipientChange}
              optionLabelProp="label"
            >
              {this.state.users.map(user => {
                const labelId = `${user.userID}`;
                const fullName = `${user.firstName} ${user.lastName}`;
                return (
                  <Option value={labelId} label={fullName}>
                    <span role="img" aria-label={fullName}>
                      {" "}
                    </span>
                    {fullName}
                  </Option>
                );
              })}
            </Select>
          </div>
          <TextField
            id="standard-number"
            label="Total Amount"
            value={this.state.tranAmount}
            onChange={this.updateAmountInput}
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            style={{
              width: "40%",
              marginLeft: "30%",
              marginRight: "30%",
              marginTop: "2em"
            }}
          />
          <Button
            style={{ margin: "1em" }}
            type="button"
            onClick={this.handleAddTransaction}
          >
            Add
          </Button>
          <Button
            style={{ margin: "1em" }}
            type="button"
            onClick={this.props.closePopup}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
}

class TransactionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      groupID: props.groupID,
      userID: props.userID,
      me_filter: false,
      editMode: false,
      editText: "Edit",
      showAddPopup: false
    };
    this.getTransactions = this.getTransactions.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.showTransactionPopup = this.showTransactionPopup.bind(this);
    this.closeTransactionPopup = this.closeTransactionPopup.bind(this);
    this.addTransaction = this.addTransaction.bind(this);
  }

  componentDidMount() {
    if (this.state.me_filter) {
      this.getMyTransactions();
    } else {
      this.getTransactions();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        groupID: nextProps.groupID,
        userID: nextProps.userID
      },
      function() {
        if (this.state.me_filter) {
          this.getMyTransactions();
        } else {
          this.getTransactions();
        }
      }
    );
  }

  getTransactions() {
    fetch(
      "https://fee-splitter.herokuapp.com/transactions/groups?groupID=" +
        this.state.groupID
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          transactions: response.data
        })
      );
  }

  getMyTransactions() {
    fetch(
      "http://fee-splitter.herokuapp.com/transactions/groups/user?userID=" +
        this.state.userID +
        "&groupID=" +
        this.state.groupID
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          transactions: response.data
        })
      );
  }

  renderTransactions = ({ title, amount }) => <div key={title}>{amount}</div>;

  handleToggle() {
    console.log("toggled");
  }

  toggleEditMode() {
    this.setState(
      {
        editMode: !this.state.editMode
      },
      function() {
        if (this.state.editMode) {
          this.setState({
            editText: "Done"
          });
        } else {
          this.setState({
            editText: "Edit"
          });
        }
      }
    );
  }

  showTransactionPopup() {
    this.setState({
      showAddPopup: true
    });
  }

  closeTransactionPopup() {
    this.setState({
      showAddPopup: false
    });
  }

  addTransaction(tranTitle, groupID, fromID_list, toID_list, amount) {
    var self = this;
    var promises = [];
    var equalAmount = amount / (fromID_list.length * toID_list.length);

    for (var i = 0; i < fromID_list.length; i++) {
      for (var j = 0; j < toID_list.length; j++) {
        var url =
          "https://fee-splitter.herokuapp.com/transactions/add?" +
          "tranTitle=" +
          tranTitle +
          "&groupID=" +
          groupID +
          "&fromID=" +
          fromID_list[i] +
          "&toID=" +
          toID_list[j] +
          "&amount=" +
          equalAmount;
        promises.push(axios.get(url));
      }
    }

    axios.all(promises).then(function() {
      self.getTransactions();
      self.closeTransactionPopup();
      self.props.updateTransactionTable();
    });
  }

  deleteRowTransaction(tranID) {
    fetch(
      "https://fee-splitter.herokuapp.com/transactions/delete?tranID=" + tranID
    )
      .then(response => response.json())
      .then(response => this.getTransactions())
      .then(response => this.props.updateTransactionTable());
  }

  handleSwitchChange = event => {
    this.setState(
      {
        me_filter: event.target.checked
      },
      function() {
        if (this.state.me_filter) {
          this.getMyTransactions();
        } else {
          this.getTransactions();
        }
      }
    );
  };

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          width: "40%",
          margin: "1em",
          padding: "0.5em"
        }}
        className="Transactions"
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="IconButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" className="Title">
              Transactions
            </Typography>
            <FormControlLabel
              defaultToggled={false}
              onChange={this.handleSwitchChange}
              control={<Switch value="checkedA" />}
              label="Me"
            />
            <Button onClick={this.toggleEditMode} color="inherit">
              {this.state.editText}
            </Button>
            <Button onClick={this.showTransactionPopup} color="inherit">
              Add
            </Button>
            {this.state.showAddPopup ? (
              <AddTransactionPopup
                groupID={this.state.groupID}
                text='Click "Close Button" to hide popup'
                closePopup={this.closeTransactionPopup}
                addTransaction={this.addTransaction}
              />
            ) : null}
          </Toolbar>
        </AppBar>
        <Paper style={{ maxHeight: 300, overflow: "auto" }}>
          <List>
            {this.state.transactions.map(transaction => {
              const labelId = transaction.tranID;
              const labelAmount = `checkbox-list-secondary-label-${transaction.amount}`;
              const amount = `$${transaction.amount}`;
              const payMessage = `${transaction.fromID_firstName} ${transaction.fromID_lastName} paid for ${transaction.toID_firstName} ${transaction.toID_lastName}`;
              if (this.state.editMode) {
                return (
                  <ListItem key={transaction} button>
                    <ListItemText
                      id={labelId}
                      primary={transaction.tranTitle}
                      secondary={payMessage}
                    />

                    <ListItemText id={labelAmount} primary={amount} />
                    <IconButton
                      edge="start"
                      className="IconButton"
                      color="inherit"
                      aria-label="menu"
                      onClick={() => this.deleteRowTransaction(labelId)}
                    >
                      <Clear />
                    </IconButton>
                  </ListItem>
                );
              } else {
                return (
                  <ListItem key={transaction} button>
                    <ListItemText
                      id={labelId}
                      primary={transaction.tranTitle}
                      secondary={payMessage}
                    />
                    <ListItemSecondaryAction>
                      <ListItemText id={labelAmount} primary={amount} />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              }
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

class OweView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groupID: props.groupID,
      transactionTotals: [],
      oweList: []
    };

    this.getUsers = this.getUsers.bind(this);
    this.getUserID = this.getUserID.bind(this);
    this.populateTransactionTable = this.populateTransactionTable.bind(this);
    this.partitionArray = this.partitionArray.bind(this);
    this.findNetOwes = this.findNetOwes.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupID: nextProps.groupID
    });
  }

  getUsers() {
    fetch(
      "https://fee-splitter.herokuapp.com/users/groups?groupID=" +
        this.state.groupID
    )
      .then(response => response.json())
      .then(response =>
        this.setState(
          {
            users: response.data
          },
          function() {
            this.populateTransactionTable();
          }
        )
      );
  }

  getUserID(user) {
    return user.userID;
  }

  getUserName(user) {
    return user.firstName + " " + user.lastName;
  }

  partitionArray(arr, pieces, usernames) {
    var parent = [];
    for (var i = 0; i < pieces; i++) {
      var current = arr.slice(i * pieces, (i + 1) * pieces);
      current.unshift(usernames[i]);
      parent.push(current);
    }
    return parent;
  }

  findNetOwes(oweList) {
    for (var i = 0; i < oweList.length; i++) {
      var currentOwe = oweList[i];
      for (var j = i + 1; j < oweList.length; j++) {
        if (
          oweList[j].fromID === currentOwe.toID &&
          oweList[j].toID === currentOwe.fromID
        ) {
          if (oweList[j].amount > currentOwe.amount) {
            oweList[j].amount = parseFloat(
              (oweList[j].amount - currentOwe.amount).toFixed(2)
            );
            oweList.splice(i, 1);
          } else if (currentOwe.amount > oweList[j].amount) {
            currentOwe.amount = parseFloat(
              (currentOwe.amount - oweList[j].amount).toFixed(2)
            );

            oweList.splice(j, 1);
          } else {
            oweList.splice(j, 1);
            oweList.splice(i, 1);
          }
        }
      }
    }
    return oweList;
  }

  populateTransactionTable() {
    var self = this;
    var transactionsList = [];
    var promises = [];

    var usernames = this.state.users.map(this.getUserName);
    var user_id_list = this.state.users.map(this.getUserID);
    for (var i = 0; i < user_id_list.length; i++) {
      for (var j = 0; j < user_id_list.length; j++) {
        var url =
          "https://fee-splitter.herokuapp.com/transactions/groups/users?groupID=" +
          this.state.groupID +
          "&fromID=" +
          user_id_list[i] +
          "&toID=" +
          user_id_list[j];
        promises.push(axios.get(url));
      }
    }

    axios
      .all(promises)
      .then(function(results) {
        results.forEach(function(response) {
          transactionsList.push(response.data.data);
        });
      })
      // .then(function() {
      //   var amountList = [];
      //   for (var i = 0; i < transactionsList.length; i++) {
      //     var currentTransactions = transactionsList[i];
      //     var total = 0;
      //     for (var j = 0; j < currentTransactions.length; j++) {
      //       total += parseFloat(currentTransactions[j].amount);
      //     }
      //     amountList[i] = total;
      //   }

      //   var partioned = self.partitionArray(
      //     amountList,
      //     user_id_list.length,
      //     usernames
      //   );
      //   self.setState({
      //     transactionTotals: partioned
      //   });
      // });
      .then(function() {
        var oweList = [];
        for (var i = 0; i < transactionsList.length; i++) {
          var currentTransactions = transactionsList[i];
          var total = 0;
          for (var j = 0; j < currentTransactions.length; j++) {
            var currentAmount = parseFloat(
              parseFloat(currentTransactions[j].amount).toFixed(2)
            );
            total += currentAmount;
          }
          if (total !== 0) {
            oweList.push({
              fromID: currentTransactions[0].toID,
              fromID_firstName: currentTransactions[0].toID_firstName,
              fromID_lastName: currentTransactions[0].toID_lastName,
              toID: currentTransactions[0].fromID,
              toID_firstName: currentTransactions[0].fromID_firstName,
              toID_lastName: currentTransactions[0].fromID_lastName,
              amount: total
            });
          }
        }

        self.setState(
          {
            oweList: self.findNetOwes(oweList)
          },
          function() {
            console.log(this.state.oweList);
          }
        );
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <div style={{ display: "inline-block", width: "25%" }}>
        {/* <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              {this.state.users.map(user => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return <TableCell>Paid {fullName}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.transactionTotals.map(row => (
              <TableRow>
                {row.map(item => (
                  <TableCell align="left">{item}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="IconButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" className="Title">
              Owes
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper style = {{ maxHeight: 300, overflow: "auto" }}>
          <List>
            {this.state.oweList.map(owe => {
              const labelAmount = `checkbox-list-secondary-label-${owe.amount}`;
              const amount = `$${owe.amount}`;
              const payMessage = `${owe.fromID_firstName} ${owe.fromID_lastName} owes ${owe.toID_firstName} ${owe.toID_lastName}`;
              return (
                <ListItem button>
                  <ListItemText primary={payMessage} />
                  <ListItemSecondaryAction>
                    <ListItemText id={labelAmount} primary={amount} />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
            ;
          </List>
        </Paper>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupSelected: props.groupSelected,
      groupTitle: props.groupTitle,
      groupID: props.groupID,
      userID: props.userID
    };

    this.oweView = React.createRef();
    this.updateTransactionTable = this.updateTransactionTable.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupTitle: nextProps.groupTitle,
      groupID: nextProps.groupID,
      userID: nextProps.userID,
      groupSelected: nextProps.groupSelected
    });
  }

  updateTransactionTable() {
    console.log("repopulating!!!");
    this.oweView.current.populateTransactionTable();
  }

  render() {
    if (this.state.groupSelected) {
      return (
        <div className="App">
          <UsersView groupID={this.state.groupID} userID={this.state.userID} />
          <TransactionsView
            groupID={this.state.groupID}
            userID={this.state.userID}
            updateTransactionTable={this.updateTransactionTable}
          />
          <OweView ref={this.oweView} groupID={this.state.groupID} />
        </div>
      );
    } else {
      return (
        <div className="App">
          <Paper>
            <Typography variant="h5" component="h3">
              Get started by selecting a group from the navigation bar above!
            </Typography>
          </Paper>
        </div>
      );
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
