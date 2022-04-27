import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import auth from "./util/auth";

const Attendance: React.FC = () => {
  interface IAttendance {
    attendance: [];
    no: 0;
  }

  // interface IA{
  //   id:number,
  //   date:string,
  //   day_type:string,
  //   clock_in_time?:Date | string,
  //   clock_out_time?:Date | string,

  // }

  const [attendance, setAttendance] = useState({ attendance: [], no: 0 });

  const [list, setList] = useState(false);
  // const [currentAttendanceId, setCurrentAttendanceId] = useState(0);

  const dateToLocal = (data: IAttendance) => {
    // console.log(data.attendance);
    data.attendance.forEach((element: any) => {
      // console.log(element);
      let inTime;
      let outTime;
      inTime = new Date(element["clock_in_time"]);
      element.clock_in_time = `${inTime.getHours()}:${inTime.getMinutes()}`;
      if (element["clock_out_time"]) {
        outTime = new Date(element["clock_out_time"]);
        element.clock_out_time = `${outTime.getHours()}:${outTime.getMinutes()}`;
      }
      // outTime = element["clock_out_time"];
      // if (outTime) {
      //   element.clock_out_time = `${outTime.getHours()}:${outTime.getMinutes()}`;
      // }
      // console.log(outTime);
    });
    // console.log(data.attendance);

    setAttendance(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("useeffect");
    axios
      .get("http://localhost:5000/api/user/attendance", {
        headers: {
          Authorization: token || "no token",
        },
      })
      .then((res: AxiosResponse) => {
        if (res.data.no > 0) {
          // console.log(res.data.attendance);
          dateToLocal(res.data);
          // console.log("response");
          setList(true);
        }
        // console.log(res.data);
      })
      .catch((error) => {
        const err = error as AxiosError;
        // setLoginStaus(false);
        // console.log("no response");

        console.log(err.response?.data);
        setList(false);
      });
  }, [list]);

  const clockedIn = async () => {
    const d = new Date();

    // console.log(d);

    const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    // console.log(date);
    // console.log(d.getDay());
    let day_type;
    if (d.getDay() === 0 || d.getDay() === 6) {
      day_type = "holiday";
    } else {
      day_type = "weekday";
    }
    // console.log(day_type);

    // console.log(d.getTime());

    const token = localStorage.getItem("token");

    const values = {
      date: date,
      day_type: day_type,
      clock_in_time: new Date(),
    };

    try {
      await axios.post(
        "http://localhost:5000/api/user/attendance/clockin",

        values,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(list);
      setList(!list);
      // console.log(list);
      // console.log(attendance);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    }
  };

  const clockedOut = async () => {
    const token = localStorage.getItem("token");

    const values = {
      clock_out_time: new Date(),
    };

    try {
      await axios.patch(
        `http://localhost:5000/api/user/attendance/clockout`,

        values,

        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(data);
      setList(!list);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };

  let navigate = useNavigate();

  return (
    <Container fluid="md">
      <h1>WELCOME</h1>
      <Button
        onClick={() => {
          auth.logout(() => {
            localStorage.removeItem("token");
            navigate("/");
          });
        }}
      >
        Logout
      </Button>{" "}
      <Button
        variant="info"
        onClick={() => {
          navigate("/userDetail");
        }}
      >
        My Detail
      </Button>
      {list ? (
        <h2 style={{ marginTop: "20px" }}>Your Attendance</h2>
      ) : (
        <h2 style={{ marginTop: "20px" }}>No Attendance Yet</h2>
      )}
      {list && attendance.no > 0 && (
        <table style={{ marginTop: "20px" }}>
          <tbody>
            <tr key={"header"}>
              {Object.keys(attendance.attendance[0])
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
            {attendance.attendance.map((item, i) => (
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
      )}
      <Button variant="outline-primary" onClick={clockedIn}>
        Clock in
      </Button>{" "}
      <Button variant="outline-primary" onClick={clockedOut}>
        Clock out
      </Button>{" "}
    </Container>
  );
};

export default Attendance;
