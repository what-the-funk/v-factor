import React from "react";
import { Link } from "react-router-dom";
// import { withAuth } from "@okta/okta-react";

class Navigation extends React.Component {
  // async checkAuthentication() {
  //   const authenticated = await this.props.auth.isAuthenticated();
  //   if (authenticated !== this.state.authenticated) {
  //     this.setState({ authenticated });
  //   }
  // }

  // componentDidUpdate() {
  //   this.checkAuthentication();
  // }

  render() {
    // if (this.state.authenticated === null) return null;

    // const authNav = (
    //   <ul className="auth-nav">
    //     <li>
    //       <Link to="/stream">Start streaming</Link>
    //     </li>
    //     <li>
    //       <Link to="/view">View a stream</Link>
    //     </li>
    //     <li>
    //       <Link to="/profile">Profile</Link>
    //     </li>
    //     <li>
    //       <a href="javascript:void(0)" onClick={() => this.props.auth.logout()}>
    //         Logout
    //       </a>
    //     </li>
    //   </ul>
    // );

    // const anonNav = (
    //   <ul className="auth-nav">
    //     <li>
    //       <a href="javascript:void(0)" onClick={() => this.props.auth.login()}>
    //         Login
    //       </a>
    //     </li>
    //     <li>
    //       <Link to="/register">Register</Link>
    //     </li>
    //   </ul>
    // );

    // return (
    //   <nav>
    //     <ul>
    //       <li>
    //         <Link to="/">Home</Link>
    //       </li>
    //       {this.state.authenticated ? authNav : anonNav}
    //     </ul>
    //   </nav>
    // );

    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stream">Start streaming</Link>
          </li>
          <li>
            <Link to="/view">View a stream</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
