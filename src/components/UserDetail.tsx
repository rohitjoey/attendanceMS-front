import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { iDetail } from "../interfaces/detail.interface";

const UserDetail: React.FC = () => {
  interface iRole {
    description: String;
    id: String;
    role_code: String;
    title: String;
    user_id: String;
  }

  const [stage, setStage] = useState({ loading: true, error: false });
  const [detail, setDetail] = useState<iDetail>({
    id: "",
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    contact: "",
    address: "",
    email: "",
    user_id: "",
    department_id: "",
  });

  const [userRole, setUserRole] = useState<iRole>({
    description: "",
    id: "",
    role_code: "",
    title: "",
    user_id: "",
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
        setDetail(res.data.userDetail);
        const userId = res.data.userDetail.user_id;

        setStage({
          loading: false,
          error: false,
        });
        // console.log(userId);
        try {
          const res1 = await axios.get(
            `http://localhost:5000/api/role/${userId}`,
            {
              headers: {
                Authorization: token || "no token",
              },
            }
          );
          setUserRole(res1.data.userRole);
          // console.log(userRole.data);
          // console.log(userRole.data.tite);
          setStage({
            loading: false,
            error: false,
          });
        } catch (error) {
          const err = error as AxiosError;
          setStage({
            loading: false,
            error: true,
          });
          console.log(err.response?.data);
        }
      } catch (error) {
        const err = error as AxiosError;
        setStage({
          loading: false,
          error: true,
        });
        console.log(err.response?.data);
      }
    })();
  }, []);

  //   console.log(detail);
  const { loading, error } = stage;

  console.log(userRole.title);

  console.log(detail);
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
          <h1>Detail</h1>
          {!loading && !error && detail && (
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
          )}
        </Col>
        <Col>
          <h2>Role</h2>
          {!loading && !error && detail && (
            <table style={{ marginTop: "20px" }}>
              <tbody>
                {(Object.keys(userRole) as (keyof typeof userRole)[]).map(
                  function (element) {
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
                          {userRole[element]}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </Col>
      </Row>

      {error && <div>Error message</div>}
    </Container>
  );
};

export default UserDetail;
