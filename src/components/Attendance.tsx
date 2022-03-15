import React from "react";
import { useNavigate } from "react-router-dom";
import auth from "./util/auth";

const Attendance: React.FC = () => {
  //   console.log("here here");
  //   console.log(userData);

  let navigate = useNavigate();

  return (
    <div className="container">
      <h1>WELCOME</h1>
      <button
        onClick={() => {
          auth.logout(() => {
            localStorage.removeItem("token");
            navigate("/");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Attendance;
