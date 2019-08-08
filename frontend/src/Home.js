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
import Navbar from './components/Navbars/Navbar';

class Home extends Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  // calls the login method in authentication service
  login = () => {
    this.props.auth.login();
  }
  // calls the logout method in authentication service
  logout = () => {
    this.props.auth.logout();
  }
  render() {
    // calls the isAuthenticated method in authentication service
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() &&
          <div className="container column">
            <h5>
              You are logged in!{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.logout}
              >
                Log Out
              </a>.
            </h5>
            <App />
          </div>
        }
        {
          !isAuthenticated() && (
            /** 
            <div className="container column">
              <h5>FeeSplitter</h5>
              <h5>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login}
                >
                  Log In
                </a>
                {' '}to continue.
              </h5>
              <h6>This is the default <b><code>Home</code></b> component. The <b><code>App</code></b> component will only be visible once you authenticate.</h6>
            </div>
            */
            <>
              <main ref="main">
                <Navbar login = {this.login}></Navbar>
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
                              A beautiful Design System{" "}
                              <span>completed with examples</span>
                            </h1>
                            <p className="lead text-white">
                              The design system comes with four pre-built pages to
                              help you get started faster. You can change the text and
                              images and you're good to go.
                         </p>
                            <div className="btn-wrapper">
                              <Button
                                className="btn-icon mb-3 mb-sm-0"
                                color="info"
                                href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alerts?ref=adsr-landing-page"
                              >
                                <span className="btn-inner--icon mr-1">
                                  <i className="fa fa-code" />
                                </span>
                                <span className="btn-inner--text">Components</span>
                              </Button>
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
                                  <i className="ni ni-check-bold" />
                                </div>
                                <h6 className="text-primary text-uppercase">
                                  Download Argon
                             </h6>
                                <p className="description mt-3">
                                  Argon is a great free UI package based on Bootstrap
                                  4 that includes the most important components and
                                  features.
                             </p>
                                <div>
                                  <Badge color="primary" pill className="mr-1">
                                    design
                               </Badge>
                                  <Badge color="primary" pill className="mr-1">
                                    system
                               </Badge>
                                  <Badge color="primary" pill className="mr-1">
                                    creative
                               </Badge>
                                </div>
                                <Button
                                  className="mt-4"
                                  color="primary"
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Learn more
                             </Button>
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="4">
                            <Card className="card-lift--hover shadow border-0">
                              <CardBody className="py-5">
                                <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                  <i className="ni ni-istanbul" />
                                </div>
                                <h6 className="text-success text-uppercase">
                                  Build Something
                             </h6>
                                <p className="description mt-3">
                                  Argon is a great free UI package based on Bootstrap
                                  4 that includes the most important components and
                                  features.
                             </p>
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
                              </CardBody>
                            </Card>
                          </Col>
                          <Col lg="4">
                            <Card className="card-lift--hover shadow border-0">
                              <CardBody className="py-5">
                                <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                                  <i className="ni ni-planet" />
                                </div>
                                <h6 className="text-warning text-uppercase">
                                  Prepare Launch
                             </h6>
                                <p className="description mt-3">
                                  Argon is a great free UI package based on Bootstrap
                                  4 that includes the most important components and
                                  features.
                             </p>
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
