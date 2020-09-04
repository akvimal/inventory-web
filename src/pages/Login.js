import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert,
  Container,
  Row,
  Col,
} from 'reactstrap';

import { connect } from 'react-redux';
import { login } from '../actions/auth';

export default connect(null, { login })((props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitForm = () => {
    if (email === '' || password === '') {
      setError('Fields are required');
      return;
    }
    props.login({ email, password });
  };

  return (
    <Container className="login-wrapper">
      <Row className="login">
        <Col className="col-6">
          <div className="logo-img-container col-9">
            <img
              src="https://static.wixstatic.com/media/764061_e885453d985b4d2fad8f18ae9af8918e~mv2.jpg/v1/crop/x_3,y_0,w_154,h_120/fill/w_72,h_56,al_c,q_80,usm_0.66_1.00_0.01/Porklogic%20Logo.webp"
              alt="porklogic-logo"
              className="logo-img"
            />
          </div>
        </Col>
        <Col className="col-6 login-form">
          <h3 className="login-title col-12">Login</h3>
          <div className="loginform">
            <Form>
              {error && <Alert color="warning">{props.error || error}</Alert>}
              <FormGroup className="col-12">
                <Label for="email">Login ID</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="col-12">
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormText color="muted" className="col-12">
                <a href="#" className="forget-password-link">
                  Forget Password?
                </a>
              </FormText>
              <FormGroup className="col-12 text-center">
                <Button
                  className="form-input col-11 mt-3"
                  size="large"
                  onClick={submitForm}>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
});
