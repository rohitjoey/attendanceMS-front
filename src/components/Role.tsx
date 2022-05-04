import React from "react";
import { iRole } from "../interfaces/detail.interface";

export default function Role({ userRole }: { userRole: iRole }) {
  // console.log(userRole);
  return (
    <table className="table">
      <tbody>
        {(Object.keys(userRole) as (keyof typeof userRole)[]).map(function (
          element
        ) {
          return (
            <tr key={element}>
              <td>{element}</td>
              <td>{userRole[element]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
