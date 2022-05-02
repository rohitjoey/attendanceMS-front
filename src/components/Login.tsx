import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
// import { useGlobalState } from "../Context/AdminContex";
import auth from "./util/auth";

const Register: React.FC = (props) => {
  // const { isAdminSetState } = useGlobalState();
  const [values, setValues] = useState({ username: "", password: "" });
  const [validated, setValidated] = useState(false);

  let navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const loginUser = async (values: { username: string; password: string }) => {
    try {
      const user: AxiosResponse = await axios.post(
        "http://localhost:5000/api/user/login",
        values
      );
      const admin = user.data.admin;

      // isAdminSetState(admin);

      // console.log(admin);

      localStorage.setItem("token", user.data.token);
      auth.login(() => {
        navigate("/attendance", { state: admin });
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setValues({ username: "", password: "" });
    setValidated(true);

    loginUser(values);
    // console.log(values);
  };

  return (
    <Container fluid="md">
      <Form
        style={{ marginTop: "20px", width: "700px" }}
        onSubmit={onSubmit}
        noValidate
        validated={validated}
      >
        <h1>Log in</h1>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the password.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
