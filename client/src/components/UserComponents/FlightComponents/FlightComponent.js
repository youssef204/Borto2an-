import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
const axios = require("axios");
import "./FlightComponentCSS.css";

import Dep_ArrComponent from "./Dep_ArrComponent";
import FlightCabin from "./FlightCabin";
import FlightAirplane from "./FlightAirplane";

export default function FlightComponent(probs) {
  //const [flight, setFlight] = useState(probs.flight); //"61a59b84b407eba753da9c9a");
  const [details, setDetails] = useState(probs.flight); //getDetails(id));
  const [loading, setLoading] = useState(true);

  const calculateDuration = (details) => {
    console.log("details", details.arrival.time);
    const diff =
      new Date(details.arrival.time) - new Date(details.departure.time);
    var unitmapping = {
      days: 24 * 60 * 60 * 1000,
      hours: 60 * 60 * 1000,
      minutes: 60 * 1000,
      seconds: 1000,
    };
    const days =
      Math.floor(diff / unitmapping.days) == 0
        ? ""
        : Math.floor(diff / unitmapping.days) + " days ";
    const hours =
      Math.floor((diff % unitmapping.days) / unitmapping.hours) == 0
        ? ""
        : Math.floor((diff % unitmapping.days) / unitmapping.hours) + " hours ";
    const minutes =
      Math.floor((diff % unitmapping.hours) / unitmapping.minutes) == 0
        ? ""
        : Math.floor((diff % unitmapping.hours) / unitmapping.minutes) +
          " minutes ";
    return days + hours + minutes;
  };

  const [duration, setDuration] = useState(calculateDuration(details));

  console.log("duration", duration);
  const onSelect = (cabin, name) => {
    probs.onSelect(details, cabin, name, duration);
  };
  //console.log(onSelect);
  useEffect(async () => {
    //console.log("details are ", details);
    //console.log("probid is ", probsId.id);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
            <FlightAirplane details={details} />
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
    headers: { authorization: "Bearer " + localStorage.getItem("token") },
  });
  //console.log(res.data[0], "  id ", id);
  return res.data[0];
}
