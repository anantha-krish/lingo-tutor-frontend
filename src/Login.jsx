import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from './images/logo.jpeg';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character'
    ),
});

export const LoginUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate({
        username: username,
        password: password,
      });
      // Your login logic here
      console.log('Login successful');
    } catch (error) {
      // Handle validation errors
      console.error('Validation Error:', error.message);
    }
  };

  const handleRegister = () => {
    navigate('/register');
    console.log('Redirecting to registration page');
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} sm={8} md={6}>
          <div className="text-center mb-4">
            <img src={logo} alt="Logo" style={{ maxWidth: '100%', maxHeight: '150px' }} />
          </div>
          <Form noValidate validated={validationSchema}>
            <Form.Group controlId="formBasicUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                //isValid={LoginSchema}
                onChange={handleUsernameChange}
                required
              />
               <Form.Control.Feedback type="invalid">
                Please provide a valid username
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                //isValid={LoginSchema}
                onChange={handlePasswordChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" className="btn-block" onClick={handleLogin}>
              Login
            </Button>

            <Button variant="secondary" className="btn-block mt-3" onClick={handleRegister}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginUser;