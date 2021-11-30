import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const axios = require("axios");
import "./FlightComponentCSS.css";

export default function FlightComponent() {
  const [id, setId] = useState("61a16d9e690b9ff649eb0419");
  const [details, setDetails] = useState(undefined); //getDetails(id));
  const [loading, setLoading] = useState(true);
  const [airplaneModelName, setAirplaneModelName] = useState("");

  const handleClick = async () => {
    console.log(details);
  };

  useEffect(async () => {
    //console.log("details are ", details);
    const res = await getDetails(id);
    const name = await getAirplaneModelName(res.airplaneModelID);

    setDetails(res);
    setAirplaneModelName(name);

    setLoading(false);

    //console.log(details);
  }, []);
  if (loading) {
    return (
      <>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        <Box sx={{ width: 600 }}>
          <Skeleton className="skeleton" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </>
    );
  } else {
    return (
      <>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
        <div style={{}}>
          <div className="shadow p-3 m-3 bg-white rounded flex-Container-Row">
            {/**airline +airplane model+flightNumber */}
            <div className="airline-grp flex-Container-Col">
              <img src="egyptair.png" width="80" height="80" />
              <div
                className="mt-2"
                style={{
                  textAlign: "center",
                  font: "20px  sans-serif",
                  color: "#2222222",
                }}
              >
                {airplaneModelName}
              </div>
              <div
                className="mt-2"
                style={{
                  textAlign: "center",
                  font: "20px  sans-serif",
                  color: "#2222222",
                }}
              >
                <label style={{ color: "#555555", font: "13px  sans-serif" }}>
                  Flight No.{" "}
                </label>
                {details.flightNumber}
              </div>
            </div>
            {/** departure arrival airport terminal date  */}
            <div className="from-to flex-Container-Row">
              <div className="place"></div>
              <div className="place"></div>
            </div>
            <div className="prices">{details.flightNumber}</div>
            <div className="details"></div>
          </div>
          <button onClick={handleClick}>refresh</button>
        </div>
      </>
    );
  }
}

async function getDetails(id) {
  const res = await axios({
    method: "get",
    url: "http://localhost:8000/api/flights",
    params: { _id: id },
  });
  return res.data[0];
}

async function getAirplaneModelName(id) {
  console.log(id);
  const res = await axios({
    method: "get",
    url: "http://localhost:8000/api/airplaneModel",
    params: { _id: id },
  });
  console.log(res);
  return res.data[0].name;
}
