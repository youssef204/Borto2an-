import React, { useState, useEffect } from "react";
import ChosenFLightsDetails from "./ChosenFLightsDetails";
import FlightsMenu from "./FlightsMenu";

function getFromLocalStorage(itemName) {
  const searchResults = JSON.parse(localStorage.getItem("searchResultData"));
  const requiredItem = searchResults[itemName];
  console.log("search results", searchResults);
  return requiredItem;
}

export default function FlightSelection() {
  
  const [firstFlightArr, setFirstFlightArr] = useState(
    getFromLocalStorage("sentData")
  );
  const [secondFlightArr, setSecondFlightArr] = useState(
    getFromLocalStorage("returnData")
  );
  const [adultNumber, setAdultNumber] = useState(
    getFromLocalStorage("adultNumber")
  );
  const [childNumber, setChildNumber] = useState(
    getFromLocalStorage("childNumber")
  );
  const [from, setFrom] = useState(getFromLocalStorage("from"));
  const [to, setTo] = useState(getFromLocalStorage("to"));
  const [firstFlight, setFirstFlight] = useState(undefined);
  const [secondFlight, setSecondFlight] = useState(undefined);

  const onFirstFlightSelect = (chosenFlight) => {
    setFirstFlight(chosenFlight);
  };
  const onSecondFlightSelect = (chosenFlight) => {
    setSecondFlight(chosenFlight);
  };
  useEffect(() => {
    console.log("first flight chosen", firstFlight);
    console.log("second flight chosen", secondFlight);
    localStorage.removeItem("flightSelectionData");
    localStorage.removeItem("reservationSummary");
    localStorage.removeItem("selectedSeats");
    window.dispatchEvent( new Event('storage') );
  }, [firstFlight, secondFlight]);
  return (
    <div style={{ paddingBottom: "150px" }}>
      {/*JSON.stringify(firstFlightArr)*/}
      {
        <FlightsMenu
          flights={firstFlightArr}
          onSelect={onFirstFlightSelect}
          from={from}
          to={to}
        />
      }

      <FlightsMenu
        flights={secondFlightArr}
        onSelect={onSecondFlightSelect}
        from={to}
        to={from}
      />

      <ChosenFLightsDetails
        firstFlight={firstFlight}
        secondFlight={secondFlight}
        adultNumber={adultNumber}
        childNumber={childNumber}
      />
    </div>
  );
}
