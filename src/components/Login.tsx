import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import auth from "./util/auth";

const Register: React.FC = (props) => {
  const [values, setValues] = useState({ username: "", password: "" });

  let navigate = useNavigate();
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");

  //     axios
  //       .get("http://localhost:5000/api/user/attendance", {
  //         headers: {
  //           Authorization: token || "no token",
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //         // setAttendance(res.data);
  //         // setLoginStaus(true);
  //       })
  //       .catch((error) => {
  //         const err = error as AxiosError;
  //         // setLoginStaus(false);
  //         console.log(err.response?.data);
  //       });
  //   }, [loginStatus]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const loginUser = async (values: { username: string; password: string }) => {
    try {
      const user: AxiosResponse = await axios.post(
        "http://localhost:5000/api/user/login",
        values
      );
      console.log(user);

      localStorage.setItem("token", user.data.token);
      auth.login(() => {
        navigate("/attendance");
      });
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //here invoke the register post
    setValues({ username: "", password: "" });
    loginUser(values);
    // console.log(values);
  };

  return (
    <Container fluid="md">
      <Form
        style={{ marginTop: "20px", width: "700px" }}
        onSubmit={onSubmit}
        noValidate
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
        </Form.Group>
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
