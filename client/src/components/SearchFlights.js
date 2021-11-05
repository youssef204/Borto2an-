import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class SearchFlights extends Component {
  constructor() {
    super();
    this.state = {
      flightNumber: "",
      from: "",
      to: "",
      LivesIn: "",
      BornIn: "",
      MartialStatus: "",
      PhoneNumber: "",
      Job: "",
    };
  }
}
