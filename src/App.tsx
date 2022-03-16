import React from "react";
import { Route, Routes } from "react-router-dom";
import Attendance from "./components/Attendance";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import { AuthRoute } from "./components/util/AuthRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/attendance"
        element={
          <AuthRoute>
            <Attendance />
          </AuthRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;