import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";


// JavaScript plugin that hides or shows a component based on your scroll
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
//import { setCookie, getCookie, removeCookie } from 'react-cookies'

// var mysql = require('mysql');

// var con = mysql.createConnection({
// 	host: "den1.mysql6.gear.host",
// 	user: "feesplitter",
// 	password: "Tj2vQV?_y564",
// 	database: "feesplitter"
// });

/*
var jsdom = require('jsdom');
var window = jsdom.jsdom().parentWindow;
var Cookies = require('cookies-js')(window);
*/

class LogoutNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      name: "",
      profile: "false",
      user_id: 1,
      groupSelectText: "Select Group ▾",
      groupInput: "",
      showGroupPopup: false
    };
    this.getGroups = this.getGroups.bind(this);
    this.setUserID = this.setUserID.bind(this);
    this.postSubID = this.postSubID.bind(this);
    this.updateUserID = this.updateUserID.bind(this);
    this.updateGroupInput = this.updateGroupInput.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.closeAddGroupPopup = this.closeAddGroupPopup.bind(this);
  }

  componentDidUpdate() {
    this.getGroups();
  }

  componentDidMount() {
    var config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    };

    axios
      .get("https://feesplitter.auth0.com/userinfo", config)
      .then(response => {
        //console.log("**********" + response.data["sub"]);
        
        // Add to database 
        
        // axios.post('/axios/userInfo', function(req, res) {
        //   return res;
        // })

        // axios.post('/axios/userInfo', response)
        //   .then(res => {
        //     return res;
        //   })

        // setCookie('userInfo', response.data["sub"], {
        // })

        this.setState(
          {
            profile: response.data,
			      name: response.data["given_name"]
          },
          () => {
            //console.log(this.state.profile);
            this.setUserID();
            this.postSubID();
            //set the user id state here
          },
        );

      });

      this.getGroups();
  }

  setUserID() {
    this.props.setUser(this.state.user_id);
  }

  postSubID() {
    var bodyContent = {
      subID: this.state.profile.sub,
      email: this.state.profile.email,
      firstName: this.state.profile.given_name,
      lastName: this.state.profile.family_name
    }

    axios.post('https://fee-splitter.herokuapp.com/userInfo',  bodyContent, {
      headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
      }
    })
      //.then(res => console.log(res))
      .then(this.updateUserID)
      .catch(err => console.error(err));
  }

  updateUserID(){
    axios.get('https://fee-splitter.herokuapp.com/userInfo/get?email=' + this.state.profile.email)
    .then(response => {
      this.setState({
        user_id: response.data.data[0].userID
      })
    });
  }

  getGroups() {
    fetch("https://fee-splitter.herokuapp.com/groups/users?userID=" + this.state.user_id)
      .then(response => response.json())
      .then(response =>
        this.setState({
          groups: response.data
        })
      );
  }

  addGroup() {
    console.log(this.state.groupInput)
    fetch("https://fee-splitter.herokuapp.com/users/groups/add?groupTitle=" + this.state.groupInput + "&userID=" + this.state.user_id)
      .then(response => response.json())
      //.then(response => console.log("Success:", JSON.stringify(response)))
      .then(response => this.getGroups())
      .then(response => this.setState({showGroupPopup: false}))
      //.then(response => ) CHANGE CURRENT GROUP HERE
  }

  updateGroupInput(e) {
    this.setState({
      groupInput: e.target.value
    });
  }

  toggleGroup(id, title){
    this.props.toggleGroup(id, title)
    this.setState({
      groupSelectText: title + " ▾"
    });
  }

  toggleRefresh() {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  closeAddGroupPopup() {
    this.setState({
      showGroupPopup: false
    })
  }

  // deleteGroup() {
  //   fetch("https://fee-splitter.herokuapp.com/users/groups/delete?groupID=" + this.state.groupID) .then(response => response.json())
  // }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-solid navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <img
                  alt="..."
                  src={require("../../assets/img/brand/feesplitter-react-white.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse navbar toggler="#navbar_global">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("../../assets/img/brand/argon-react.png")}
                        />
                      </Link>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">{this.state.groupSelectText}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.groups.map(group => {
                        return <DropdownItem onClick={() => this.toggleGroup(group.groupID, group.groupTitle)}>{group.groupTitle}</DropdownItem>;
                      })}
                      <DropdownItem onClick={() => this.setState({showGroupPopup: true})}>Add New Group +</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <ListItem>
            {this.state.showGroupPopup ? (
              <AddGroupPopup
                closePopup={this.closeAddGroupPopup}
                updateGroupInput={this.updateGroupInput}
                addGroup={this.addGroup}
                //addTransaction={this.addTransaction}
              />
            ) : null}
            {/* <TextField
              id="standard-bare"
              placeholder="add group"
              margin="normal"
              onChange={this.updateGroupInput}
              inputProps={{ "aria-label": "bare" }}
            />
            <div>
              <button id="addGroupButton" onClick={this.addGroup}>
                Add
              </button>
              {
                this.state.refresh ? (
                  window.location.reload()
                ) : null
              }
            </div> */}
          </ListItem>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <span className="nav-link-inner--text">Welcome, {this.state.name}</span>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={this.props.logout}
                      target="_blank"
                    >
                      <span className="nav-link-inner--text ml-1">Log Out</span>
                    </Button>
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

class AddGroupPopup extends React.Component{
  render() {
    return (
      <div className="group_popup">
        <div className="group_popup_inner" style={{ textAlign: "center" }}>
          <TextField
              id="standard-bare"
              placeholder="group name here"
              margin="normal"
              style={{width: "50%"}}
              //onChange={this.updateGroupInput}
              inputProps={{ "aria-label": "bare" }}
              onChange={this.props.updateGroupInput}
            />
          <Button style={{ margin: "1em" }} type="button" onClick={this.props.addGroup}>
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

export default LogoutNavbar;
