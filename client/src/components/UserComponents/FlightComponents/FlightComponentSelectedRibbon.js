import React from "react";

export default function FlightComponentSelectedRibbon({ chosen }) {
  console.log("color is green", chosen);
  const backgroundColor = chosen ? "#2e7d32" : "rgb(205,205,205)";
  return (
    <div
      style={{
        marginLeft: "-50px",
        marginRight: "31px",
        marginBottom: "-15px",
        marginTop: "-15px",
        minWidth: "40px",
        minHeight: "210px",
        height: "100%",
        backgroundColor,
      }}
    ></div>
  );
}
