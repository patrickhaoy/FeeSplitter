import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
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
import { Select } from "antd";

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
    console.log(this.state.emailInput);
    // fetch(
    //   'https://fee-splitter.herokuapp.com/groups/users/email/add?groupID=' + this.state.groupID + '&email=' + this.state.emailInput
    // )
    //   .then(response => response.json())
    //   .then(response => console.log('Success:', JSON.stringify(response)))
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
    });
  }

  updateEmailInput(e) {
    this.setState({
      emailInput: e.target.value
    });
  }

  deleteRowUser(userID) {
    console.log("deleting" + userID);
  }

  //[checked, setChecked] = React.useState([1]);

  render() {
    return (
      <div
        style={{ width: "20%", margin: "1em", padding: "0.5em" }}
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
        <Paper>
          <ListItem>
            <TextField
              id="standard-bare"
              placeholder="add friend's email"
              margin="normal"
              onChange={this.updateEmailInput}
              inputProps={{ "aria-label": "bare" }}
            />
            {/*  */}

            <div>
              {/*<button onClick={this.togglePopup.bind(this)}> Add</button>*/}
              <ListItemText
                id="addEmailButton"
                onClick={this.togglePopup.bind(this)}
              >
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
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={this.handleToggle(user.user_id)}
                        //checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
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

class AddUsersPopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="popup_header">
            <h1>User Not Registered</h1>
          </div>
          <h5 align="center">
            This email has not been registered yet. Please have them register
            with FeeSplitter first.{" "}
          </h5>
          <button type="button" onClick={this.props.closePopup}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

const { Option } = Select;

class AddTransactionPopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="popup_header">
            <h1>Add a Transaction</h1>
          </div>
          <h5 align="center">Add a transaction here!</h5>
          <div>
            <span style = {{color: "black", margin: '1em'}}>From</span>
            <Select
              mode="multiple"
              style={{ width: "30%" }}
              placeholder="select one country"
              defaultValue={["china"]}
              //onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value="china" label="China">
                <span role="img" aria-label="China">
                  🇨🇳{" "}
                </span>
                China (中国)
              </Option>
              <Option value="usa" label="USA">
                <span role="img" aria-label="USA">
                  🇺🇸{" "}
                </span>
                USA (美国)
              </Option>
              <Option value="japan" label="Japan">
                <span role="img" aria-label="USA">
                  🇯🇵{" "}
                </span>
                Japan (日本)
              </Option>
              <Option value="koean" label="Koean">
                <span role="img" aria-label="USA">
                  🇰🇷{" "}
                </span>
                Koean (韩国)
              </Option>
            </Select>
            <span style = {{color: "black", margin: '1em'}}>to</span>
            <Select
              mode="multiple"
              style={{ width: "30%" }}
              placeholder="select one country"
              defaultValue={["china"]}
              //onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value="china" label="China">
                <span role="img" aria-label="China">
                  🇨🇳{" "}
                </span>
                China (中国)
              </Option>
              <Option value="usa" label="USA">
                <span role="img" aria-label="USA">
                  🇺🇸{" "}
                </span>
                USA (美国)
              </Option>
              <Option value="japan" label="Japan">
                <span role="img" aria-label="USA">
                  🇯🇵{" "}
                </span>
                Japan (日本)
              </Option>
              <Option value="koean" label="Koean">
                <span role="img" aria-label="USA">
                  🇰🇷{" "}
                </span>
                Koean (韩国)
              </Option>
            </Select>
          </div>
          <button style = {{margin: '1em'}}type="button" onClick={this.props.closePopup}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

// class OweView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       owes = [],
//       groupID = props.groupID,
//       userID = props.userID
//     };
//   }
//   this.getOwes = this.getOwes.bind(this);

//   componentDidMount() {
//     if (this.state.me_filter) {
//       this.getMyOwes();
//     } else {
//       this.getOwes();
//     }
//   }

//   componentWillRecieveProps(nextProps) {
//     this.setState(
//       {
//         groupID: nextProps.groupID,
//         userID: nextProps.userID
//       },
//       function() {
//         if (this.state.me_filter) {
//           this.getMyOwes();
//         } else {
//           this.getOwes();
//         }
//       }
//     );
//   }

//   getOwes() {
//     fetch(
//       "https://fee-splitter.herokuapp.com/transactions/groups?groupID=" +
//         this.state.groupID
//     )
//       .then(response => response.json())
//       .then(response =>
//         this.setState({
//           owes: response.data
//         })
//       );
//   }

//   getMyTransactions() {
//     fetch(
//       "http://fee-splitter.herokuapp.com/transactions/groups/user?userID=" +
//         this.state.userID +
//         "&groupID=" +
//         this.state.groupID
//     )
//       .then(response => response.json())
//       .then(response =>
//         this.setState({
//           transactions: response.data
//         })
//       );
//   }
// }

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
        style={{ width: "40%", margin: "1em", padding: "0.5em" }}
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
                text='Click "Close Button" to hide popup'
                closePopup={this.closeTransactionPopup}
              />
            ) : null}
          </Toolbar>
        </AppBar>
        <Paper>
          <List>
            {this.state.transactions.map(transaction => {
              const labelId = `checkbox-list-secondary-label-${
                transaction.tranTitle
              }`;
              const labelAmount = `checkbox-list-secondary-label-${
                transaction.amount
              }`;
              const amount = `$${transaction.amount}`;
              const payMessage = `${transaction.fromID_firstName} ${
                transaction.fromID_lastName
              } paid ${transaction.toID_firstName} ${
                transaction.toID_lastName
              }`;
              if (this.state.editMode) {
                return (
                  <ListItem key={transaction} button>
                    <ListItemText
                      id={labelId}
                      primary={transaction.tranTitle}
                      secondary={payMessage}
                    />

                    <ListItemText id={labelAmount} primary={amount} />
                    <Clear />
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupTitle: props.groupTitle,
      groupID: props.groupID,
      userID: props.userID
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupTitle: nextProps.groupTitle,
      groupID: nextProps.groupID,
      userID: nextProps.userID
    });
  }

  render() {
    return (
      <div className="App">
        <UsersView groupID={this.state.groupID} userID={this.state.userID} />
        <TransactionsView
          groupID={this.state.groupID}
          userID={this.state.userID}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
