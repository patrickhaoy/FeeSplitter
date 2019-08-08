import React from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class UsersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.getUsers = this.getUsers.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('https://fee-splitter.herokuapp.com/users')
      .then(response => response.json())
      .then(response =>
        this.setState(
          {
            users: response.data
          }))
  }

  renderUsers = ({ user_id, firstName }) => <div key={user_id}>{firstName}</div>

  handleToggle() {
    console.log('toggled');
  }

  //[checked, setChecked] = React.useState([1]);

  render() {
    return (
      <div style={{ width: '20%', margin: '1em', padding: '0.5em' }} className="Users">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className="IconButton" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" className="Title">
              Users
          </Typography>
            <Button color="inherit">Add</Button>
          </Toolbar>
        </AppBar>
        <Paper>
          <List>
            {this.state.users.map(user => {
              const labelId = `checkbox-list-secondary-label-${user.firstName}`;
              return (
                <ListItem key={user} button>
                  <ListItemText id={labelId} primary={user.firstName} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={this.handleToggle(user.user_id)}
                      //checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
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

class TransactionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
    this.getTransactions = this.getTransactions.bind(this);
    this.renderTransactions = this.renderTransactions.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    fetch('https://fee-splitter.herokuapp.com/transactions')
      .then(response => response.json())
      .then(response =>
        this.setState(
          {
            transactions: response.data
          }))
  }

  renderTransactions = ({ title, amount }) => <div key={title}>{amount}</div>

  handleToggle() {
    console.log('toggled');
  }

  //[checked, setChecked] = React.useState([1]);

  render() {
    return (
      <div style={{ width: '20%', margin: '1em', padding: '0.5em' }} className="Transactions">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className="IconButton" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: 1 }} variant="h6" className="Title">
              Transactions
          </Typography>
            <Button color="inherit">Add</Button>
          </Toolbar>
        </AppBar>
        <Paper>
          <List>
            {this.state.transactions.map(transaction => {
              const labelId = `checkbox-list-secondary-label-${transaction.title}`;
              const labelAmount = `checkbox-list-secondary-label-${transaction.amount}`;
              return (
                <ListItem key={transaction} button>
                  <ListItemText id={labelId} primary={transaction.title} />
                  <ListItemText id={labelAmount} primary={transaction.amount} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={this.handleToggle(transaction.tranID)}
                      //checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
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
  }

  render() {
    return (
      <div className="App">
        <UsersView></UsersView>
        <TransactionsView></TransactionsView>
      </div>
    );
  }

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
