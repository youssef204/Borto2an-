import React, { useState } from "react";

export default function Dep_ArrComponent({ isDeparture, probs }) {
  //console.log("is dep ", typeof isDeparture);
  const [details, setDetails] = useState(probs);
  const innerText = (
    <>
      <br />
      <label style={{ fontSize: 25, color: "#333333" }}>
        {details.airport}
      </label>
      <br />
      <br />
      Ter: {details.terminal}
      <br />
      {details.time.substring(0, 10)}
    </>
  );
  const text =
    isDeparture === "true" ? (
      <div className="placeText text-start text-muted">{innerText}</div>
    ) : (
      <div className="placeText text-end text-muted">{innerText}</div>
    );
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link>
      <div className="place flex-Container-Row">
        {isDeparture === "true" ? (
          <img src="takingOff2.png" width="30%" height="60%" />
        ) : undefined}
        {text}
        {isDeparture === "false" ? (
          <img src="landing2.png" width="30%" height="60%" />
        ) : undefined}
      </div>
    </>
  );
}
