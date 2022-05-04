import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { iDetail } from "../interfaces/detail.interface";
// import Department from './Department';

const UserDetail: React.FC = () => {
  const [stage, setStage] = useState({ loading: true, error: false });
  const [detail, setDetail] = useState<iDetail>({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    contact: "",
    address: "",
    email: "",
    user_id: "",
    role: {},
    department: {},
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/userDetail", {
          headers: {
            Authorization: token || "no token",
          },
        });
        console.log(res.data.userDetail);
        const data = res.data.userDetail;
        const role = res.data.userDetail.role;
        const department = res.data.userDetail.department;
        if (role) {
        }
        data.role = role ? role.title : "No role assigned";
        data.department = department
          ? department.name
          : "No department assigned";

        // const userDepartment = res.data.userDetail.department;
        // console.log(title);
        // setUserRole(userRole);
        // setUserDepartment(userDepartment);
        // ["role", "department"].forEach((e) => delete res.data.userDetail[e]);
        setDetail(data);

        setStage({
          loading: false,
          error: false,
        });
        // console.log(userId);
      } catch (error) {
        const err = error as AxiosError;
        setStage({
          loading: false,
          error: true,
        });
        console.log(err);
      }
    })();
  }, []);

  //   console.log(detail);
  const { loading, error } = stage;
  // const { loadingR, errorR } = stageR;

  // console.log(userRole.title);

  // console.log(detail);
  //   console.log(Object.keys(detail));

  // console.log(userRolesdf);
  // console.log(userRole);
  return (
    <Container fluid="md">
      <Row>
        <h1>Profile</h1>
        {loading && <h1>Loading...</h1>}
      </Row>
      <Row>
        <Col>
          <h3>Detail</h3>
          {!loading && !error && detail ? (
            <table style={{ marginTop: "20px" }}>
              <tbody>
                {(Object.keys(detail) as (keyof typeof detail)[]).map(function (
                  element
                ) {
                  return (
                    <tr
                      style={{
                        border: "1px solid black",

                        padding: "5px 5px",
                      }}
                      key={element}
                    >
                      <td
                        style={{
                          border: "1px solid black",

                          padding: "5px 50px",
                          fontWeight: "bold",
                        }}
                      >
                        {element}
                      </td>
                      <td
                        style={{
                          border: "1px solid black",
                          padding: "5px 50px",
                        }}
                      >
                        {detail[element]}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3>No user detail</h3>
          )}
        </Col>
      </Row>

      {error && <div>Error message</div>}
    </Container>
  );
};

export default UserDetail;
