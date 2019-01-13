import React from "react";
import { withAuth } from "@okta/okta-react";
import { connect } from "react-redux";

import { changePasswordApiCall } from "../data/actions";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, oldPassword: "", newPassword: "" };
    this.getCurrentUser = this.getCurrentUser.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
  }

  async getCurrentUser() {
    this.props.auth.getUser().then(user => this.setState({ user }));
  }

  handleOldPasswordChange(e) {
    this.setState({ oldPassword: e.target.value });
  }
  handleNewPasswordChange(e) {
    this.setState({ newPassword: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    var data = {
      userId: this.state.user.sub,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
    };
    this.props.changePasswordApiCall(data);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    if (!this.state.user) return null;

    const errorMessage = this.props.error ? (
      <div>
        <strong>Error! </strong>
        {this.props.error}
      </div>
    ) : null;

    const successMessage = this.props.success ? (
      <div>
        <strong>Success! </strong>
        {this.props.success}
      </div>
    ) : null;

    return (
      <section>
        <h1>User Profile</h1>
        <div>
          <label>Name:</label>
          <span>{this.state.user.name}</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h3>Change Password</h3>
          <br />
          {errorMessage}
          {successMessage}
          <div>
            <label>Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={this.state.oldPassword}
              autoComplete="current-password"
              onChange={this.handleOldPasswordChange}
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={this.state.newPassword}
              autoComplete="new-password"
              onChange={this.handleNewPasswordChange}
            />
          </div>
          <input type="submit" id="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  error: state.profile.error,
  success: state.profile.success,
});

const mapDispatchToProps = dispatch => ({
  changePasswordApiCall: data => dispatch(changePasswordApiCall(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuth(ProfilePage));
