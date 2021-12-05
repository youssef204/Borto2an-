import React from "react";
import "./FlightComponentCSS.css";

export default function FlightAirplane({ details }) {
  //console.log("details", details);
  return (
    <div className="airline-grp flex-Container-Col">
      <img src="egyptair.png" width="70" height="70" />
      <div className="mt-2 text border-top border-bottom">
        {details.airplaneModelID?.name}
      </div>
      <div className="mt-2 text">
        <label style={{ color: "#555555", font: "13px  sans-serif" }}>
          Flight No.{" "}
        </label>
        {details.flightNumber}
      </div>
    </div>
  );
}
