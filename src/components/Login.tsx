import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
// import { useGlobalState } from "../Context/AdminContex";
import auth from "./util/auth";

const Register: React.FC = (props) => {
  // interface iLogin {
  //   username: String;
  //   password: String;
  // }

  // const { isAdminSetState } = useGlobalState();
  const [values, setValues] = useState({ username: "", password: "" });
  // const [errors, setErrors] = useState<iLogin>({
  //   username: "",
  //   password: "",
  // });

  let navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // if (!!errors[event.target.name as keyof typeof errors])
    //   setErrors({
    //     ...errors,
    //     [event.target.name]: "",
    //   });
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

  // const findFormErrors = () => {
  //   const { username, password } = values;
  //   const newErrors: iLogin = {
  //     username: "",
  //     password: "",
  //   };
  //   // name errors
  //   if (!username || username === "")
  //     newErrors.username = "Username cannot be empty!";

  //   if (!password || password === "")
  //     newErrors.password = "Password cannot be empty!";

  //   return newErrors;
  // };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const newErrors = findFormErrors();
    // console.log(errors);
    // if (Object.keys(newErrors)) {
    //   setErrors(newErrors);
    //   console.log("herer");
    // } else {
    //   console.log("OK");
    // }

    // setValidated(true);

    loginUser(values);
    setValues({ username: "", password: "" });
    // console.log(values);
  };

  return (
    <Container fluid="md">
      <Form style={{ marginTop: "20px", width: "700px" }} onSubmit={onSubmit}>
        <h1>Log in</h1>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter username"
            name="username"
            value={values.username}
            onChange={onChange}
            // isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            Please enter the username.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={onChange}
            // isInvalid={!!errors.password}
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
