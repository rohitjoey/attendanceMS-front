import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminAction from "./components/AdminAction";
import Attendance from "./components/Attendance";
import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import RegisterDetail from "./components/RegisterDetail";
import UserDetail from "./components/UserDetail";
import { AuthRoute } from "./components/util/AuthRoute";
import { GlobalStateProvider } from "./Context/AdminContex";

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerDetail" element={<RegisterDetail />} />
        <Route path="/userDetail" element={<UserDetail />} />
        <Route path="/adminAction" element={<AdminAction />} />

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
    </GlobalStateProvider>
  );
};

export default App;
