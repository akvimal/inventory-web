import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import SideNav from '../components/sidenav';
import BaconBit from '../pages/BaconBit';
import RasperryPig from '../pages/RasperryPig';
import Category1 from '../pages/Category1';
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    const end = (
      <>
        <Button icon="pi pi-question" className="p-button-rounded p-button-info p-button-outlined" />
        <Button icon="pi pi-bell" className="p-button-rounded p-button-info p-button-outlined" />
        <Button icon="pi pi-user" className="p-button-rounded p-button-info p-button-outlined" />
      </>
    );

    const start = <><div className="title">Inventory Management</div></>;

    return (
      <div>
        {this.props.isAuthUser ? (
          <>
            <div>
              <Menubar start={start} end={end} />
              <SideNav />
            </div >
          </>
        ) : null
        }
      </div >
    );
  }
}

export default connect(({ isAuthUser }) => ({ isAuthUser }), { logout })(
  NavBar
);


{/* {this.props.isAuthUser ? (
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
              <Button color="inherit">Login</Button>
            </Link>
          )} */}