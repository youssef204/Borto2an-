import React, { useState, useEffect } from "react";
import FlightsMenu from "./FlightsMenu";

export default function FlightSelection() {
  const [firstFlightArr, setFirstFlightArr] = useState([
    {
      _id: "61a59b84b407eba753da9c9a",
      flightNumber: 109,
      departure: {
        airport: "New York",
        terminal: "990",
        time: "2021-11-30T16:19:00.000Z",
        _id: "61a63546e773595397a8261d",
      },
      arrival: {
        airport: "Berlin",
        terminal: "991",
        time: "2021-11-30T11:33:00.000Z",
        _id: "61a63546e773595397a8261e",
      },
      airline: "Lufthanza",
      hasTransit: true,
      airplaneModelID: {
        _id: "61a4efcae90c6cd60e01423f",
        name: "Airbus 1192",
        economyRows: 10,
        economyColumns: 10,
        businessRows: 3,
        businessColumns: 5,
        firstClassRows: 2,
        firstClassColumns: 2,
        createdAt: "2021-11-29T15:20:42.166Z",
        updatedAt: "2021-11-29T15:20:42.166Z",
        __v: 0,
      },
      economyCabin: {
        takenSeats: [],
        adultPrice: 100,
        adultBaggage: 90,
        childPrice: 80,
        childBaggage: 70,
        _id: "61a636e2bafff62e510ab6ae",
      },
      businessCabin: {
        takenSeats: [],
        adultPrice: 100,
        adultBaggage: 90,
        childPrice: 80,
        childBaggage: 70,
        _id: "61a636e2bafff62e510ab6af",
      },
      firstCabin: {
        takenSeats: [],
        adultPrice: 100,
        adultBaggage: 90,
        childPrice: 80,
        childBaggage: 70,
        _id: "61a636e2bafff62e510ab6b0",
      },
      createdAt: "2021-11-30T03:33:24.048Z",
      updatedAt: "2021-11-30T19:22:22.265Z",
      __v: 0,
    },
    {
      _id: "61a6d6eb396fa0eae7f63dca",
      flightNumber: 178,
      departure: {
        airport: "Tanta El-dawly",
        terminal: "2",
        time: "2021-12-04T03:57:00.000Z",
        _id: "61a6d6eb396fa0eae7f63dcb",
      },
      arrival: {
        airport: "Tanta el ma7aly",
        terminal: "4",
        time: "2021-12-30T03:57:00.000Z",
        _id: "61a6d6eb396fa0eae7f63dcc",
      },
      airline: "EgyptAir",
      hasTransit: false,
      airplaneModelID: {
        _id: "61a6d675396fa0eae7f63dc6",
        name: "Boeing 777",
        economyRows: 4,
        economyColumns: 4,
        businessRows: 5,
        businessColumns: 5,
        firstClassRows: 6,
        firstClassColumns: 6,
        createdAt: "2021-12-01T01:57:09.139Z",
        updatedAt: "2021-12-01T01:57:09.139Z",
        __v: 0,
      },
      economyCabin: {
        takenSeats: [],
        adultPrice: 100,
        adultBaggage: 2,
        childPrice: 50,
        childBaggage: 1,
        _id: "61a6d6eb396fa0eae7f63dcd",
      },
      businessCabin: {
        takenSeats: [],
        adultPrice: 200,
        adultBaggage: 2,
        childPrice: 100,
        childBaggage: 1,
        _id: "61a6d6eb396fa0eae7f63dce",
      },
      firstCabin: {
        takenSeats: [],
        adultPrice: 400,
        adultBaggage: 3,
        childPrice: 200,
        childBaggage: 2,
        _id: "61a6d6eb396fa0eae7f63dcf",
      },
      createdAt: "2021-12-01T01:59:07.257Z",
      updatedAt: "2021-12-01T01:59:07.257Z",
      __v: 0,
    },
  ]);
  const [secondFlightArr, setSecondFlightArr] = useState([
    {
      _id: "61a6d6eb396fa0eae7f63dca",
      flightNumber: 178,
      departure: {
        airport: "Tanta El-dawly",
        terminal: "2",
        time: "2021-12-04T03:57:00.000Z",
        _id: "61a6d6eb396fa0eae7f63dcb",
      },
      arrival: {
        airport: "Tanta el ma7aly",
        terminal: "4",
        time: "2021-12-30T03:57:00.000Z",
        _id: "61a6d6eb396fa0eae7f63dcc",
      },
      airline: "EgyptAir",
      hasTransit: false,
      airplaneModelID: {
        _id: "61a6d675396fa0eae7f63dc6",
        name: "Boeing 777",
        economyRows: 4,
        economyColumns: 4,
        businessRows: 5,
        businessColumns: 5,
        firstClassRows: 6,
        firstClassColumns: 6,
        createdAt: "2021-12-01T01:57:09.139Z",
        updatedAt: "2021-12-01T01:57:09.139Z",
        __v: 0,
      },
      economyCabin: {
        takenSeats: [],
        adultPrice: 100,
        adultBaggage: 2,
        childPrice: 50,
        childBaggage: 1,
        _id: "61a6d6eb396fa0eae7f63dcd",
      },
      businessCabin: {
        takenSeats: [],
        adultPrice: 200,
        adultBaggage: 2,
        childPrice: 100,
        childBaggage: 1,
        _id: "61a6d6eb396fa0eae7f63dce",
      },
      firstCabin: {
        takenSeats: [],
        adultPrice: 400,
        adultBaggage: 3,
        childPrice: 200,
        childBaggage: 2,
        _id: "61a6d6eb396fa0eae7f63dcf",
      },
      createdAt: "2021-12-01T01:59:07.257Z",
      updatedAt: "2021-12-01T01:59:07.257Z",
      __v: 0,
    },
  ]);
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
  }, [firstFlight, secondFlight]);
  return (
    <>
      {/*JSON.stringify(firstFlightArr)*/}
      <FlightsMenu flights={firstFlightArr} onSelect={onFirstFlightSelect} />
      <FlightsMenu flights={secondFlightArr} onSelect={onSecondFlightSelect} />
    </>
  );
}
