import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const AdminAction: React.FC = () => {
  interface iUser {
    username: String;
    id: String;
    active?: String;
    verified_at: String;
    password?: String;
  }

  const [usersList, setUsersList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const [show, setShow] = useState(false);

  const [modelName, setModelName] = useState<String>();

  const [values, setValues] = useState({
    userId: "",
    assignedId: "",
  });

  const [status, setStatus] = useState("");

  const handleClose = () => {
    setShow(false);
    setModelName("");
    setValues({ userId: "", assignedId: "" });
    setStatus("");
  };
  const handleShow = (name: String) => {
    // console.log(name);
    setShow(true);
    setModelName(name);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const assign = async (modelName: String | undefined) => {
    if (modelName === "Assign Role") {
      // console.log("role", values);

      (async () => {
        try {
          const res: AxiosResponse = await axios.post(
            "http://localhost:5000/api/role/assign",
            values
          );
          // alert(res.data);
          setStatus(res.data.status);
        } catch (error) {
          console.log(error);
        }
      })();
    } else if (modelName === "Assign Department") {
      (async () => {
        try {
          const res: AxiosResponse = await axios.post(
            "http://localhost:5000/api/department/assign",
            values
          );
          // alert(res.data);
          setStatus(res.data.status);
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      console.log("NOOOOO");
    }
  };

  //   console.log(validated);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(values);
    // console.log(modelName);
    assign(modelName);
    // setShow(false);
    // console.log(values);

    setValues({ userId: "", assignedId: "" });
    // setShow(false);
  };

  const [stage, setStage] = useState({ loading: true, error: false });

  useEffect(() => {
    const token = localStorage.getItem("token");

    (async () => {
      try {
        const res: AxiosResponse = await axios.get(
          "http://localhost:5000/api/user/",
          {
            headers: {
              Authorization: token || "no token",
            },
          }
        );

        const res1: AxiosResponse = await axios.get(
          "http://localhost:5000/api/role/",
          {
            headers: {
              Authorization: token || "no token",
            },
          }
        );
        const res2: AxiosResponse = await axios.get(
          "http://localhost:5000/api/department/",
          {
            headers: {
              Authorization: token || "no token",
            },
          }
        );
        // console.log(res1.data);
        // console.log(res.data.users.length);
        // console.log(res.data.success);
        if (res.data.success) {
          // let allData = res.data.users;
          // allData = allData.map((x: iUser) => {
          //   delete x.password;
          //   // delete x.active;
          //   return x;
          // });
          //   console.log(allData[0]);
          setUsersList(res.data.users);
          setRoleList(res1.data);
          setDepartmentList(res2.data);
          setStage({
            loading: false,
            error: false,
          });
        } else {
          setStage({ loading: false, error: true });
        }

        // setUsers(res.dat);
        // const userId = res.data.userDetail.user_id;

        // setStage({
        //   loading: false,
        //   error: false,
        // });
        // console.log(userId);
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

  const { loading, error } = stage;

  return (
    <Container fluid="md">
      {!loading && !error ? (
        <h1>Admin Action</h1>
      ) : (
        <>
          <h1>Not authorized</h1>
          <Link to="/">Go Home</Link>
        </>
      )}

      <Row>
        {loading && error && (
          <div>
            <h1>Loading...</h1> <Link to="/">Go Home</Link>
          </div>
        )}
      </Row>
      <Row>
        <Col>
          {!loading && !error && usersList && (
            <>
              <h3>Users List</h3>
              <table style={{ marginTop: "20px" }}>
                <tbody>
                  <tr key={"header"}>
                    {Object.keys(usersList[0])
                      // .filter((key) => {
                      //   if (key === "id" || key === "user_id") {
                      //     return false;
                      //   }
                      //   return true;
                      // })
                      .map((key, i) => (
                        <th
                          style={{
                            border: "1px solid black",
                            margin: "0px 0px",
                            padding: "5px 5px",
                          }}
                          key={i}
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                  {usersList.map((item, i) => (
                    <tr key={i}>
                      {Object.values(item).map((val: any, i) => (
                        <td
                          style={{
                            border: "1px solid black",
                            margin: "0px 0px",
                            padding: "5px 5px",
                          }}
                          key={i}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Col>
        <Col>
          {!loading && !error && roleList && (
            <>
              <h2>Role List</h2>
              <Button onClick={() => handleShow("Assign Role")}>
                Assign Role to User
              </Button>
              <table style={{ marginTop: "20px" }}>
                <tbody>
                  <tr key={"header"}>
                    {Object.keys(roleList[0])
                      // .filter((key) => {
                      //   if (key === "id" || key === "user_id") {
                      //     return false;
                      //   }
                      //   return true;
                      // })
                      .map((key, i) => (
                        <th
                          style={{
                            border: "1px solid black",
                            margin: "0px 0px",
                            padding: "5px 5px",
                          }}
                          key={i}
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                  {roleList.map((item, i) => (
                    <tr key={i}>
                      {Object.values(item).map((val: any, i) => (
                        <td
                          style={{
                            border: "1px solid black",
                            margin: "0px 0px",
                            padding: "5px 5px",
                          }}
                          key={i}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Col>
        <Col>
          {!loading && !error && departmentList && (
            <>
              <h2>Department List</h2>
              <Button onClick={() => handleShow("Assign Department")}>
                Assign Department to User
              </Button>
              <table style={{ marginTop: "20px" }}>
                <tbody>
                  <tr key={"header"}>
                    {Object.keys(departmentList[0])
                      // .filter((key) => {
                      //   if (key === "id" || key === "user_id") {
                      //     return false;
                      //   }
                      //   return true;
                      // })
                      .map((key, i) => (
                        <th
                          style={{
                            border: "1px solid black",
                            margin: "0px 0px",
                            padding: "5px 5px",
                          }}
                          key={i}
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                  {departmentList.map((item, i) => (
                    <tr key={i}>
                      {Object.values(item).map((val: any, i) => (
                        <td
                          style={{
                            border: "1px solid black",
                            margin: "0px 0px",
                            padding: "5px 5px",
                          }}
                          key={i}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Col>
      </Row>

      {error && <div>Error message</div>}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modelName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Enter the user's id"
                autoFocus
                required
                name="userId"
                value={values.userId}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the user id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="aId">
              <Form.Label>{modelName} Id</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="Enter the id"
                autoFocus
                required
                name="assignedId"
                value={values.assignedId}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the id.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>{" "}
            <Button variant="primary" type="submit">
              Assign
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>{status}</p>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminAction;
