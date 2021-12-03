import React, { useState, useEffect } from "react";
import FlightComponent from "./FlightComponents/FlightComponent";

import CSS from "./FlightMenu.css";

export default function FlightsMenu(probs) {
  const [flightArr, setflightArr] = useState(probs.flights);
  const [flightChosen, setFlightChosen] = useState(undefined);

  //console.log(probs);

  const onSelect = (flight, cabin, name, duration) => {
    setFlightChosen({ flight, cabin, name, duration });
    //console.log(flightChosen);
  };

  useEffect(() => {
    probs.onSelect(flightChosen);
  }, [flightChosen]);
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link>
      <div className="list ">
        <div className="settings d-flex flex-row">
          <div className="text-holder">
            Flights from {flightArr[0].departure.airport} to{" "}
            {flightArr[0].arrival.airport}
          </div>
        </div>
        <div className="container">
          {flightArr.map((f) => {
            //console.log(f._id);
            return <FlightComponent flight={f} onSelect={onSelect} />;
          })}
        </div>
      </div>
    </>
  );
}
