import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const UserDetail: React.FC = () => {
  //   interface iDetail {
  //     id: String;
  //     first_name: String;
  //     last_name: String;
  //     gender: String;
  //     dob: String;
  //     contact: String;
  //     address: String;
  //     email: String;
  //     department_id?: String;
  //   }

  const [stage, setStage] = useState({ loading: true, error: false });
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/userDetail", {
        headers: {
          Authorization: token || "no token",
        },
      })
      .then((res: AxiosResponse) => {
        setDetail(res.data.userDetail);
        setStage({
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        const err = error as AxiosError;
        setStage({
          loading: false,
          error: true,
        });
        console.log(err.response?.data);
      });
  }, []);

  //   console.log(detail);
  const { loading, error } = stage;
  //   console.log(detail);
  //   console.log(Object.keys(detail));

  return (
    <Container fluid="md">
      <h1>Profile</h1>
      {loading && <h1>Loading...</h1>}
      {!loading && !error && (
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
      {error && <div>Error message</div>}
    </Container>
  );
};

export default UserDetail;
