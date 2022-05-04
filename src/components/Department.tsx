import React from "react";
import { iDepartment } from "../interfaces/detail.interface";

export default function Department({
  userDepartment,
}: {
  userDepartment: iDepartment;
}) {
  // console.log(userDepartment);
  return (
    <table style={{ marginTop: "20px" }}>
      <tbody>
        {(Object.keys(userDepartment) as (keyof typeof userDepartment)[]).map(
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
                  {userDepartment[element]}
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
