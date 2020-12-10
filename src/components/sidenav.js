import React, { Component } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

export default class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLeft: true,
      visibleRight: false,
      visibleTop: false,
      visibleBottom: false,
      visibleFullScreen: false,
      visibleCustomToolbar: false,
    };
  }
  render() {
    const customIcons = <></>;
    return (
      <div>
        <div className="sidenavbar ">
          <Sidebar visible={this.state.visibleLeft} position="left" icons={customIcons}>
            <img
              src="assets/Porklogic logo.svg"
              className="porklogic-img"
            ></img>
            {/* <h1 style={{ fontWeight: 'normal' }}>Left Sidebar</h1> */}
            {/* <Link className="SideNavC">DEVICE 1</Link> */}
            <Button
              type="button"
              label="DEVICE"
              className="SideNavColo"
              style={{ marginRight: ".25em" }}
            />
            <br></br>
            <Button type="button" label="COMPANY" className="SideNavColo" />
            <br></br>
            <Button
              type="button"
              label="WEIGHT SCALE"
              className="SideNavColo"
            />
            <br></br>
            <Button type="button" label="IOT GATEWAY" className="SideNavColo" />
            <br></br>
          </Sidebar>
        </div>
      </div>
    );
  }
}
