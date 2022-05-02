import React from "react";
import { iRole } from "../interfaces/detail.interface";

export default function Role({ userRole }: { userRole: iRole }) {
  console.log(userRole);
  return (
    <table style={{ marginTop: "20px" }}>
      <tbody>
        {(Object.keys(userRole) as (keyof typeof userRole)[]).map(function (
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
                {userRole[element]}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
