import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Card, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Location from "../pages/setup/Master/location";
import Organisation from "../pages/setup/Master/organisation";
import DeviceTypes from "../pages/setup/Master/deviceTypes";
import DeviceVersion from "../pages/setup/Master/deviceVersion";
import Project from "../pages/setup/Master/project";
import Farms from "../pages/setup/Master/farm";
import Barns from "../pages/setup/Master/barns";
import Pens from "../pages/setup/Master/pens";
import UserPage from "../pages/setup/Master/userPage";
import AlertMail from "../pages/setup/Master/alertMail";

function Master() {
  const history = useHistory();

  useEffect(() => {
    history.push("/master/location");
  }, [history]);

  const location = useLocation();
  const base = location.pathname.split("/")[1];
  const paths = [
    { path: "location" },
    { path: "organisations" },
    { path: "devicetypes" },
    { path: "deviceversions" },
    { path: "projects" },
    { path: "farms" },
    { path: "barns" },
    { path: "pens" },
    { path: "users" },
    { path: "alertmail" },
  ];
  const base2 = location.pathname.split("/")[2];
  const active = paths.map((p) => {
    return p.path === base2 ? "master-buttons-active" : "master-buttons";
  });

  return (
    <>
      <Card className="master-card">
        <div className="rpdashText">
          Master
          <hr style={{ marginRight: "2.5vw" }} className="new4" />
          <Grid>
            <Grid>
              <Link to={`/${base}/location`}>
                <Button className={active[0]}>Locations</Button>
              </Link>
              <Link to={`/${base}/organisations`}>
                <Button className={active[1]}>Organizations</Button>
              </Link>
              <Link to={`/${base}/devicetypes`}>
                <Button className={active[2]}>Device types</Button>
              </Link>
              <Link to={`/${base}/deviceversions`}>
                <Button className={active[3]}>Device Versions</Button>
              </Link>
              <Link to={`/${base}/projects`}>
                <Button className={active[4]}>Projects</Button>
              </Link>
              <Link to={`/${base}/farms`}>
                <Button className={active[5]}>Farms</Button>
              </Link>
              <Link to={`/${base}/barns`}>
                <Button className={active[6]}>Barns</Button>
              </Link>
              <Link to={`/${base}/pens`}>
                <Button className={active[7]}>Pens</Button>
              </Link>
              <Link to={`/${base}/users`}>
                <Button className={active[8]}>Users</Button>
              </Link>
              <Link to={`/${base}/alertmail`}>
                <Button className={active[9]}>Alert Mail</Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Card>
      <Card className="test-card">
        <ProtectedRoute path="/master/location" component={Location} />
        <ProtectedRoute path="/master/organisations" component={Organisation} />
        <ProtectedRoute path="/master/devicetypes" component={DeviceTypes} />
        <ProtectedRoute
          path="/master/deviceversions"
          component={DeviceVersion}
        />
        <ProtectedRoute path="/master/projects" component={Project} />
        <ProtectedRoute path="/master/farms" component={Farms} />
        <ProtectedRoute path="/master/barns" component={Barns} />
        <ProtectedRoute path="/master/pens" component={Pens} />
        <ProtectedRoute path="/master/users" component={UserPage} />
        <ProtectedRoute path="/master/alertmail" component={AlertMail} />
      </Card>
    </>
  );
}

export default Master;
