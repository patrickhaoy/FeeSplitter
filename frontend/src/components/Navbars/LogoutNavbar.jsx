import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
      groupSelectText: "Select Group ▾"
    };
    this.getGroups = this.getGroups.bind(this);
    this.setUserID = this.setUserID.bind(this);
    this.postSubID = this.postSubID.bind(this);
    this.updateUserID = this.updateUserID.bind(this);
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

  toggleGroup(id, title){
    this.props.toggleGroup(id, title)
    this.setState({
      groupSelectText: title + " ▾"
    });
  }

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
                  {/* 
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Components</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Getting started
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn how to use Argon compiling Scss, change
                              brand colors and more.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-palette" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Foundation
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn more about colors, typography, icons and the
                              grid system we used for Argon.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-ui-04" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Components
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Browse our 50 beautiful handcrafted components
                              offered in the Free version.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  */}
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">{this.state.groupSelectText}</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.state.groups.map(group => {
                        return <DropdownItem onClick={() => this.toggleGroup(group.groupID, group.groupTitle)}>{group.groupTitle}</DropdownItem>;
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
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

export default LogoutNavbar;
