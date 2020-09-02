import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { connect } from "react-redux";
import { login } from "../actions/auth";


export default connect(null, { login })(props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = () => {
    if (email === "" || password === "") {
      setError("Fields are required");
      return;
    }
    props.login({ email, password });
  };

  return (
    <Form>
      <h3>Login</h3>
      {error && (
        <Alert color="warning">
          {props.error || error}
        </Alert>
      )}
      <FormGroup>
      <Label for="email">Email</Label>
      <Input type="text" name="email" id="email"
        className="form-input"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      </FormGroup>
      <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password"
        name="password" id="password"
        className="form-input"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      </FormGroup>
      <FormGroup>
      <Button
        className="form-input"
        size="large"
        onClick={submitForm}
      >
        Login
      </Button>
      </FormGroup>
      
    </Form>
  );
});