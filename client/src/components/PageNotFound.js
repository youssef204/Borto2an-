import React from "react";
import { useHistory } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import "./404.css";

function Flight() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      ></link>

      <div
        className="errorbody"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="d-flex flex-row">
          <img src="4.png" width="200px" height="250px" />
          <img src="sadOrange.png" width="450px" height="450px" />
          <img src="4.png" width="200px" height="250px" />
        </div>
        <br />
        <Button
          className="btn btn-primary btn-lg border-5"
          onClick={routeChange}
        >
          Return to home page
        </Button>
      </div>
    </>
  );
}

export default Flight;
