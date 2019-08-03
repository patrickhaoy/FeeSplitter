import React from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import UserListSecondary from './UserListSecondary'

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
    fetch('https://fee-splitter.herokuapp.com')
      .then(response => response.json())
      .then(response =>
        this.setState(
          {
            users: response.data
          }))
  }

  renderUsers = ({ user_id, firstName }) => <div key={user_id}>{firstName}</div>

  handleToggle(){
    console.log('toggled');
  }

  //[checked, setChecked] = React.useState([1]);

  render() {
    return (
      <div className="Users">
        {this.state.users.map(this.renderUsers)}
        <List>
          {this.state.users.map(user => {
            const labelId = `checkbox-list-secondary-label-${user.firstName}`;
            return (
              <ListItem key={user} button>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${user.user_id}`}
                    src={`/static/images/avatar/${user.user_id + 1}.jpg`}
                  />
                </ListItemAvatar>
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
      </div>
    );
  }

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
