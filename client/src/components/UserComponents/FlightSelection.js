import React, { useState, useEffect } from "react";
import ChosenFLightsDetails from "./ChosenFLightsDetails";
import FlightsMenu from "./FlightsMenu";
import { calculateDuration } from "./FlightComponents/FlightComponent";
import { useHistory } from "react-router-dom";

function getFromLocalStorage(itemName) {
  const searchResults = JSON.parse(localStorage.getItem("searchResultData"));
  const requiredItem = searchResults[itemName];
  //console.log("search results", searchResults);
  return requiredItem;
}
function reform(reservedFlight, model) {
  const cabin = reservedFlight.flightId[reservedFlight.cabin + "Cabin"];
  //console.log("reservedFlight.flightId", reservedFlight);
  reservedFlight.flightId["airplaneModelID"] = model;

  let result = {
    flight: reservedFlight.flightId,
    name: reservedFlight.cabin,
    cabin,
    duration: calculateDuration(reservedFlight.flightId),
  };
  //console.log("result of flight", result);
  return result;
}

export default function FlightSelection() {
  const history = useHistory();

  if(!JSON.parse(localStorage.getItem("searchResultData"))){
    history.push('/');
    return <></>;
  }


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
    //console.log("look", chosenFlight);
    setFirstFlight(chosenFlight);
  };
  const onSecondFlightSelect = (chosenFlight) => {
    setSecondFlight(chosenFlight);
  };

  useEffect(() => {
    const EditedReservation = JSON.parse(
      localStorage.getItem("EditedReservation")
    );
    //console.log("EditedReservation", EditedReservation);
    if (EditedReservation) {
      const firstFlightFromReservation = reform(
        EditedReservation.departureFlight,
        EditedReservation.airplaneModeDeparture
      );

      const secondFlightFromReservation = reform(
        EditedReservation.returnFlight,
        EditedReservation.airplaneModeReturn
      );
      setFirstFlight(firstFlightFromReservation);
      setSecondFlight(secondFlightFromReservation);
    }
  }, []);

  useEffect(() => {
    console.log("first flight chosen", firstFlight);
    console.log("second flight chosen", secondFlight);
    localStorage.removeItem("flightSelectionData");
    localStorage.removeItem("reservationSummary");
    localStorage.removeItem("selectedSeats");
    window.dispatchEvent(new Event("storage"));
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
          chosen={firstFlight}
        />
      }

      <FlightsMenu
        flights={secondFlightArr}
        onSelect={onSecondFlightSelect}
        from={to}
        to={from}
        chosen={secondFlight}
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
