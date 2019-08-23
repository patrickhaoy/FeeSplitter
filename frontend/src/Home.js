import React, { Component } from 'react';
import App from './App';

import classnames from "classnames";
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/css/argon-design-system-react.css";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import LoginNavbar from './components/Navbars/LoginNavbar';
import LogoutNavbar from './components/Navbars/LogoutNavbar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupSelected: false,
      selectedGroupTitle: "",
      selectedGroupID: "",
      userID: ""
    }

    this.toggleGroup = this.toggleGroup.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  // calls the login method in authentication service
  login = () => {
    this.props.auth.login();
  }
  // calls the logout method in authentication service
  logout = () => {
    this.props.auth.logout();
  }

  toggleGroup(id, group) {
    this.setState({
      selectedGroupTitle: group,
      selectedGroupID: id,
      groupSelected: true
    });
  }

  setUser(id) {
    this.setState({
      userID: id
    });

  }

  render() {
    // calls the isAuthenticated method in authentication service
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() &&
          <div>
            <LogoutNavbar setUser = {this.setUser} toggleGroup = {this.toggleGroup} logout = {this.logout}></LogoutNavbar>
            <App groupSelected = {this.state.groupSelected} userID = {this.state.userID} groupTitle = {this.state.selectedGroupTitle} groupID = {this.state.selectedGroupID}/>
          </div>
        }
        {
          !isAuthenticated() && (
            <>
              <main ref="main">
                <LoginNavbar login = {this.login}></LoginNavbar>
                <div className="position-relative">
                  {/* shape Hero */}
                  <section className="section section-lg section-shaped pb-250">
                    <div className="shape shape-style-1 shape-default">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <Container className="py-lg-md d-flex">
                      <div className="col px-0">
                        <Row>
                          <Col lg="6">
                            <h1 className="display-3 text-white">
                              Manage shared expenses{" "}
                              <span>for travel, rent, and more</span>
                            </h1>
                            <p className="lead text-white">
                              FeeSplitter is built to make exchanges seamless, effortless, and friendly.
                         </p>
                            <div className="btn-wrapper">
                              <Button
                                className="btn-icon mb-3 mb-sm-0"
                                color="info"
                              >
                                <span className="btn-inner--text">Get Started</span>
                              </Button>
                              {/*
                              <Button
                                className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                                color="default"
                                href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                              >
                                <span className="btn-inner--icon mr-1">
                                  <i className="ni ni-cloud-download-95" />
                                </span>
                                <span className="btn-inner--text">
                                  Download React
                             </span>
                              </Button>
                              */}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Container>
                    {/* SVG separator */}
                    <div className="separator separator-bottom separator-skew">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                      >
                        <polygon
                          className="fill-white"
                          points="2560 0 2560 100 0 100"
                        />
                      </svg>
                    </div>
                  </section>
                  {/* 1st Hero Variation */}
                </div>
                <section className="section section-lg pt-lg-0 mt--200">
                  <Container>
                    <Row className="justify-content-center">
                      <Col lg="12">
                        <Row className="row-grid">
                          <Col lg="4">
                            <Card className="card-lift--hover shadow border-0">
                              <CardBody className="py-5">
                                <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                                  <i className="ni ni-circle-08" />
                                </div>
                                <h6 className="text-primary text-uppercase">
                                  Register
                             </h6>
                                <p className="description mt-3">
                                  Create an account with us and get immediate access to trip creation, transaction access, and more.
                             </p>
                                <div>
                                </div>
                                {/* 
                                <Button
                                  className="mt-4"
                                  color="primary"
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Learn more
                                </Button>
                                */}
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="4">
                            <Card className="card-lift--hover shadow border-0">
                              <CardBody className="py-5">
                                <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                  <i className="ni ni-chart-bar-32" />
                                </div>
                                <h6 className="text-success text-uppercase">
                                  Manage Trips
                             </h6>
                                <p className="description mt-3">
                                  Get an easy-to-use dashboard to keep track of expenses between group members.
                             </p>
                                {/* 
                                <div>
                                  <Badge color="success" pill className="mr-1">
                                    business
                               </Badge>
                                  <Badge color="success" pill className="mr-1">
                                    vision
                               </Badge>
                                  <Badge color="success" pill className="mr-1">
                                    success
                               </Badge>
                                </div>
                                <Button
                                  className="mt-4"
                                  color="success"
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Learn more
                             </Button>
                             */}
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="4">
                            <Card className="card-lift--hover shadow border-0">
                              <CardBody className="py-5">
                                <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                                  <i className="ni ni-credit-card" />
                                </div>
                                <h6 className="text-warning text-uppercase">
                                  Divide Expenses
                             </h6>
                                <p className="description mt-3">
                                  Pay back all the debts you owe at the click of a button, and get paid back instantly.
                             </p>
                             {/** 
                                <div>
                                  <Badge color="warning" pill className="mr-1">
                                    marketing
                               </Badge>
                                  <Badge color="warning" pill className="mr-1">
                                    product
                               </Badge>
                                  <Badge color="warning" pill className="mr-1">
                                    launch
                               </Badge>
                                </div>
                                <Button
                                  className="mt-4"
                                  color="warning"
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Learn more
                             </Button>
                             */}
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </main>
            </>
          )
        }
      </div>
    );
  }
}

export default Home;
