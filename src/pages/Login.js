import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { fetchAuthLogin } from "../redux/auth/authAction";
import { TextField } from "@material-ui/core";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";

export const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({ email: "", password: "" });

  const submitForm = () => {
    dispatch(fetchAuthLogin({ email: user.email, password: user.password }));
  };

  return (
    <Card
      style={{ backgroundImage: "url(/assests/pigbg.png)" }}
      className="login-card1"
    >
      <div style={{ margin: "auto" }}>
        <div className="div-logo">
          <img
            src="\assests\Porklogic-logo-white.png"
            alt="PIG Logo"
            className="porklogic-logo"
          />
        </div>
        <Card className="login-card">
          <FormGroup>
            <TextField
              id="standard-basic"
              label="Email"
              className="form"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              className="form"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button className="form-button" size="large" onClick={submitForm}>
              Login
              <ArrowForwardOutlinedIcon style={{ marginLeft: "210px" }} />
            </Button>
          </FormGroup>
        </Card>
        <p
          style={{
            color: "#f7b924",
            float: "right",
            fontSize: "14px",
            marginTop: "10px",
          }}
        >
          Forgot Password?
        </p>
      </div>
      <div>
        <p
          style={{
            color: "#ffffff",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          By signing up, you agree with our
          <span
            style={{
              color: "#f7b924",
            }}
          >
            Terms and Conditions
          </span>
        </p>
      </div>
    </Card>
  );
};
