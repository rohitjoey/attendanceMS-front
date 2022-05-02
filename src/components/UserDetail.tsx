import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Role from "../components/Role";
import { iDetail, iRole } from "../interfaces/detail.interface";

const UserDetail: React.FC = () => {
  const [stage, setStage] = useState({ loading: true, error: false });
  const [stageR, setStageR] = useState({ loadingR: true, errorR: false });
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
        console.log(res);
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
          setStageR({
            loadingR: false,
            errorR: false,
          });
        } catch (error) {
          const err = error as AxiosError;
          setStageR({
            loadingR: false,
            errorR: true,
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
  const { loadingR, errorR } = stageR;

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
        <Col>
          <h2>Role</h2>
          {!loadingR && !errorR && userRole ? (
            <Role userRole={userRole} />
          ) : (
            <h5>Role not assigned</h5>
          )}
        </Col>
      </Row>

      {error && <div>Error message</div>}
    </Container>
  );
};

export default UserDetail;
