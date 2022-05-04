import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Department from "../components/Department";
import Role from "../components/Role";
import { iDepartment, iDetail, iRole } from "../interfaces/detail.interface";

const UserDetail: React.FC = () => {
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
  });

  const [userDepartment, setUserDepartment] = useState<iDepartment>({
    id: "",
    name: "",
    hod: "",
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
        ["id", "department_id", "role_id"].forEach((e) => delete data[e]);
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
          const roleData = res1.data.userRole;
          delete roleData.id;
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

        try {
          const res1 = await axios.get(
            `http://localhost:5000/api/department/${userId}`,
            {
              headers: {
                Authorization: token || "no token",
              },
            }
          );
          // console.log(res1.data);
          const departmentData = res1.data.userDepartment;
          delete departmentData.id;
          setUserDepartment(res1.data.userDepartment);
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
        <Col>
          <Row>
            <h2>Role</h2>
            {!loading && !error && userRole ? (
              <Role userRole={userRole} />
            ) : (
              <h5>Role not assigned</h5>
            )}
          </Row>
          <Row>
            <h2>Department</h2>
            {!loading && !error && userDepartment ? (
              <Department userDepartment={userDepartment} />
            ) : (
              <h5>Department not assigned</h5>
            )}
          </Row>
        </Col>
      </Row>

      {error && <div>Error message</div>}
    </Container>
  );
};

export default UserDetail;
