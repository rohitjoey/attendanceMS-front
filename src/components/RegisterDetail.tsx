import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useLocation, useNavigate } from "react-router-dom";

const RegisterDetail = () => {
  type LocationState = {
    state: {
      userId: string;
    };
  };

  interface iValues {
    first_name: String;
    last_name: String;
    gender: String;
    dob: String;
    contact: String;
    address: String;
    email: String;
    user_id: String;
  }

  const [validated, setValidated] = useState(false);
  let location = useLocation();
  let navigate = useNavigate();

  const { userId } = (location as LocationState)?.state;

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    contact: "",
    address: "",
    email: "",
    user_id: userId,
  });
  //   console.log(userId);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const registerUser = async (values: iValues) => {
    try {
      const user: AxiosResponse = await axios.post(
        "http://localhost:5000/api/userdetail",
        values
      );
      //   const userId = user.data.user.id;
      if (user.data.success) {
        navigate("/attendance");
      }
      //   localStorage.setItem("token", user.data.token);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setValues({
      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      contact: "",
      address: "",
      email: "",
      user_id: userId,
    });

    // console.log(values);
    setValidated(true);
    registerUser(values);
  };

  return (
    <Container fluid="md">
      <Form
        style={{ marginTop: "20px", width: "700px" }}
        onSubmit={onSubmit}
        noValidate
        validated={validated}
      >
        <h1>Register Details</h1>
        <Form.Group className="mb-3" controlId="formGroupfirst_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter first_name"
            name="first_name"
            value={values.first_name}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a firstName.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGrouplast_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter last_name"
            name="last_name"
            value={values.last_name}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a lastName.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupgender">
          <Form.Label>Gender</Form.Label>
          {/* <Form.Control
            required
            type="text"
            placeholder="Enter gender"
            name="gender"
            value={values.gender}
            onChange={onChange}
          /> */}
          <Form.Control
            onChange={onChange}
            required
            name="gender"
            as="select"
            aria-label="Select gender"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please enter a gender.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="col-md-4" controlId="formGroupdob">
          <Form.Label>Date of birth</Form.Label>
          <Form.Control
            required
            type="date"
            placeholder="Enter date of birth"
            name="dob"
            value={values.dob}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a date of birth.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-3" controlId="formGroupcontact">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter contact"
            name="contact"
            value={values.contact}
            onChange={onChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a contact.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-3" controlId="formGroupaddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            name="address"
            value={values.address}
            onChange={onChange}
          />

          <Form.Control.Feedback type="invalid">
            Please enter a address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-3 mb-3" controlId="formGroupemail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={onChange}
          />

          <Form.Control.Feedback type="invalid">
            Please enter a email.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterDetail;
