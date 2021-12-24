import React, { useState, useEffect } from "react";
import { FlightComponent } from "./FlightComponents/FlightComponent";

import "./FlightMenu.css";

export default function FlightsMenu({ flights, chosen, from, to, onSelect }) {
  //console.log({ flights });
  const [flightArr, setflightArr] = useState(flights);
  const [flightChosen, setFlightChosen] = useState(chosen);
  const [fromTitle, setTitle] = useState(from);
  const [toTitle, setToTitle] = useState(to);

  const onSelectCabin = (flight, cabin, name, duration) => {
    onSelect({ flight, cabin, name, duration });
  };
  //console.log("state", { flights, chosen, to, from });
  const updateContent = () => {
    return flightArr?.map((f) => {
      if (flightChosen && flightChosen.flight.flightNumber === f.flightNumber) {
        //console.log("found");
        return (
          <FlightComponent
            flight={f}
            onSelect={onSelectCabin}
            chosenFlight={true}
            chosenCabin={flightChosen.name}
          />
        );
      } else {
        return (
          <FlightComponent
            flight={f}
            onSelect={onSelectCabin}
            chosenFlight={false}
          />
        );
      }
    });
  };
  let content = updateContent();

  // console.log("probs", probs);
  //console.log("flight in menu ", flightChosen, flightChosen?.flightNumber);

  useEffect(() => {
    setflightArr(flights);
    setFlightChosen(chosen);
    setTitle(from);
    setToTitle(to);
    //console.log("flightChosen in menu", flightChosen);
    content = updateContent();
  }, [flights, chosen, from, to]);

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
            Flights from {fromTitle} to {toTitle}
          </div>
        </div>
        <div className="flightMenuContainer p-auto">
          {flightArr && flightArr.length === 0 && (
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
