import React, { useState, useEffect } from "react";
import FlightComponent from "./FlightComponents/FlightComponent";

import "./FlightMenu.css";

export default function FlightsMenu(probs) {
  const [flightArr, setflightArr] = useState(probs.flights);
  const [flightChosen, setFlightChosen] = useState(undefined);
  const [from, setFrom] = useState(probs.from);
  const [to, setTo] = useState(probs.to);

  //console.log(probs);

  const onSelect = (flight, cabin, name, duration) => {
    setFlightChosen({ flight, cabin, name, duration });
    //console.log(flightChosen);
  };

  useEffect(() => {
    probs.onSelect(flightChosen);
  }, [flightChosen]);
  // if (flightArr.length === 0)
  //   return (
  //     <>
  //       <div>No Flights</div>
  //     </>
  //   );
  console.log("flightArr", flightArr);

  return (
    <>
      {/* <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link> */}
      <div className="list ">
        <div className="settings d-flex flex-row">
          <div className="text-holder">
            Flights from {from} to {to}
          </div>
        </div>
        <div className="flightMenuContainer p-auto">
          {flightArr.length === 0 && (
            <label
              style={{
                margin: "2% 37%",
                font: "25px Verdana",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              No flights are found
            </label>
          )}
          {flightArr.map((f) => {
            //console.log(f._id);
            return <FlightComponent flight={f} onSelect={onSelect} />;
          })}
        </div>
      </div>
    </>
  );
}
