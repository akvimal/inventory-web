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

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const end = <InputText placeholder="Search" type="text" />;
    const icon = (
      <Button icon="pi pi-user" className="p-button-rounded p-button-info" />
    );
    const notification = (
      <>
        <Button icon="pi pi-question" className="p-button-rounded p-button-info" />
        <Button icon="pi pi-user" className="p-button-rounded p-button-info" />
        <Button icon="pi pi-bell" className="p-button-rounded p-button-info" />
      </>
    );
    // const items:[{
    //   icon:"pi pi-user",
    //   className="p-button-rounded p-button-info"
    // }];
    const start = (
      <Link to="/home">
        <Button color="inherit">Home</Button>
      </Link>
    );
    const title = <><div className="title">INVENTORY MANAGEMENT</div></>;

    const items = [[
      {
        // label: 'File',
        icon: 'pi pi-times',
        className: "p-submenu-icon ",
      }],
    [
      {
        icon: 'pi pi-times',
        className: "p-menuitem a",
      }]];

    return (
      <div className="homepagebody">
        {this.props.isAuthUser ? (
          <>
            <div>
              <Menubar start={title} end={notification} />
              <SideNav />
            </div >
            <div>
              <div >
                <p className="device">Device</p>
              </div>
              <hr className="divider"></hr>
              <div className="card-content">
                <BaconBit />
                <RasperryPig />
              </div>
            </div>
          </>
        ) : null
        }

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
      </div>
    );
  }
}

export default connect(({ isAuthUser }) => ({ isAuthUser }), { logout })(
  NavBar
);
