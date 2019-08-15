import React from "react";
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
  }

  toggleEditMode() {
    this.setState(
      {
        editMode: !this.state.editMode
      },
      function() {
        if(this.state.editMode){
          this.setState({
            editText: 'Done'
          });
        }
        else{
          this.setState({
            editText: 'Edit'
          });
        }
      }
    );
  }

  updateEmailInput(e) {
    this.setState({
      emailInput: e.target.value
    });
  }

  deleteRowUser(userID){
    console.log('deleting' + userID);
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
            <ListItemText id="addEmailButton" onClick={this.getUserEmail}>
              Add
            </ListItemText>
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

class TransactionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      groupID: props.groupID,
      userID: props.userID,
      me_filter: false
    };
    this.getTransactions = this.getTransactions.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
            <Button color="inherit">Add</Button>
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
