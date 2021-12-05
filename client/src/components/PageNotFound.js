import React from "react";
import { useHistory } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

function Flight() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="sadOrange.png" width="450px" height="450px" />
      <h2 style={{ fontSize: 50 }}>Page Not Found!</h2>
      <br />
      <Button className="btn btn-primary btn-lg border-5" onClick={routeChange}>
        Return to home page
      </Button>
    </div>
  );
}

export default Flight;
