import React, { useState, useEffect } from "react";
import { FlightComponent } from "./FlightComponents/FlightComponent";

import "./FlightMenu.css";

export default function FlightsMenu(probs) {
  const [flightArr, setflightArr] = useState(probs.flights);
  const [flightChosen, setFlightChosen] = useState(probs.chosen);
  const [from, setFrom] = useState(probs.from);
  const [to, setTo] = useState(probs.to);

  const onSelect = (flight, cabin, name, duration) => {
    probs.onSelect({ flight, cabin, name, duration });
  };

  let content = flightArr.map((f) => {
    // console.log("chosen in menu", flightChosen);
    // console.log("probs.chosen", probs.chosen);
    if (flightChosen && flightChosen.flightNumber === f.flightNumber) {
      return (
        <FlightComponent flight={f} onSelect={onSelect} chosenFlight={true} />
      );
    } else {
      return (
        <FlightComponent flight={f} onSelect={onSelect} chosenFlight={false} />
      );
    }
  });

  // console.log("probs", probs);
  console.log("flight in menu ", flightChosen, flightChosen?.flightNumber);

  useEffect(() => {
    setFlightChosen(probs.chosen);
  }, [probs]);
  useEffect(() => {
    content = flightArr.map((f) => {
      console.log(
        "look",
        flightChosen && flightChosen.flightNumber === f.flightNumber
      );
      if (flightChosen && flightChosen.flightNumber === f.flightNumber) {
        console.log("hereeeee");
        return (
          <FlightComponent flight={f} onSelect={onSelect} chosenFlight={true} />
        );
      } else {
        return (
          <FlightComponent
            flight={f}
            onSelect={onSelect}
            chosenFlight={false}
          />
        );
      }
    });
  }, [flightChosen]);

  // if (flightArr.length === 0)
  //   return (
  //     <>
  //       <div>No Flights</div>
  //     </>
  //   );
  //console.log("flightArr", flightArr);

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
          {content}
        </div>
      </div>
    </>
  );
}
