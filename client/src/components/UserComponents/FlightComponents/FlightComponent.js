import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const axios = require("axios");
import "./FlightComponentCSS.css";

import Dep_ArrComponent from "./Dep_ArrComponent";
import FlightCabin from "./FlightCabin";

export default function FlightComponent(probs) {
  const [id, setId] = useState(probs.id); //"61a59b84b407eba753da9c9a");
  const [details, setDetails] = useState(undefined); //getDetails(id));
  const [loading, setLoading] = useState(true);

  const onSelect = (cabin, name) => {
    probs.onSelect(details, cabin, name);
  };
  //console.log(onSelect);
  useEffect(async () => {
    //console.log("details are ", details);
    //console.log("probid is ", probsId.id);

    const res = await getDetails(id);
    if (res) {
      setDetails(res);
      setLoading(false);
    }
    //console.log(details.departure.airport);
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
        <Box sx={{ width: 600, margin: "auto", marginTop: 5, marginBottom: 5 }}>
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
        <div>
          <div className="shadow p-3 m-3 bg-white rounded flex-Container-Row">
            {/**airline +airplane model+flightNumber */}
            <div className="airline-grp flex-Container-Col">
              <img src="egyptair.png" width="70" height="70" />
              <div className="mt-2 text border-top border-bottom">
                {details.airplaneModelID.name}
              </div>
              <div className="mt-2 text">
                <label style={{ color: "#555555", font: "13px  sans-serif" }}>
                  Flight No.{" "}
                </label>
                {details.flightNumber}
              </div>
            </div>

            {/** departure arrival airport terminal date  */}
            <div className="from-to">
              <div className="line"></div>
              <div className="flex-Container-Row">
                <Dep_ArrComponent
                  isDeparture="true"
                  probs={details.departure}
                />
                <Dep_ArrComponent isDeparture="false" probs={details.arrival} />
              </div>
            </div>
            <div className="prices flex-Container-Row">
              <FlightCabin
                economy={details.economyCabin}
                business={details.businessCabin}
                first={details.firstCabin}
                onSelect={onSelect}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

async function getDetails(id) {
  if (!id) {
    console.log("undefined id in flight");
    return;
  }
  const res = await axios({
    method: "get",
    url: "http://localhost:8000/api/flights",
    params: { _id: id },
  });
  return res.data[0];
}
