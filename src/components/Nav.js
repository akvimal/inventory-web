import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

import { logout } from '../actions/auth';

class NavBar extends Component {
  render() {
    return (
      <div style={{ marginLeft: 'auto' }}>
        {this.props.isAuthUser ? (
          <>
            <Link to="/home">
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/my-account">
              <Button color="inherit">My Account</Button>
            </Link>
            <Button color="inherit" onClick={this.props.logout}>
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login">
            {/* <Button color="inherit">Login</Button> */}
          </Link>
        )}
      </div>
    );
  }
}

export default connect(({ isAuthUser }) => ({ isAuthUser }), { logout })(
  NavBar
);
