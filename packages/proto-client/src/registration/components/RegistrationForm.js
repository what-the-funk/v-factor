import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import { registrationApiCall } from "../data/actions";

const { REACT_APP_OKTA_ORG_URL } = process.env;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sessionToken: null,
    };
    this.oktaAuth = new OktaAuth({ url: REACT_APP_OKTA_ORG_URL });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.registrationApiCall(this.oktaAuth, this.state);
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.props.error ? <span>{this.props.error}</span> : null;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Registration Form</h3>
        <br />
        {errorMessage}
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            id="firstName"
            value={this.state.firstName}
            onChange={this.handleFirstNameChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={this.state.lastName}
            onChange={this.handleLastNameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <input type="submit" id="submit" value="Register" />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  sessionToken: state.login.sessionToken,
  error: state.registration.error,
});

const mapDispatchToProps = dispatch => ({
  registrationApiCall: (oktaAuth, data) => dispatch(registrationApiCall(oktaAuth, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuth(RegistrationForm));
