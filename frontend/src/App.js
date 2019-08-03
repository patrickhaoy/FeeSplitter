import React from 'react';
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.getUsers = this.getUsers.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
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
    
  render() {
    return (
      <div className="App">
        {this.state.users.map(this.renderUsers)}
      </div>
    ); 
  }
  
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
