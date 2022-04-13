import React from "react";
import { Button } from "react-bootstrap";

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Hello</h1>

      <a href="/attendanceMS-front/login">
        <Button type="button" className="btn btn-primary">
          Log in
        </Button>{" "}
      </a>

      <a href="/attendanceMS-front/register">
        <Button variant="secondary">Register</Button>
      </a>
    </div>
  );
};

export default Home;
