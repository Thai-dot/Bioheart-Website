import React, { Component } from "react";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default class NotFound extends Component {

  render() {
    console.log("mct report error");
    return (
      <div>
        <h1>Home Page</h1>
        <div className="d-flex flex-column m-5">
          <Link to="/exercise">Go to exercise page</Link>
          <Link to="/login">Go to login page</Link>
          <Link to="/login_2">Go to login page using class component</Link>
          <Link to="/overview">Go to overview page</Link>
          <Link to="/heart_summary">Go to heart summary page</Link>
          <Link to="/snapshot">Go to snapshot page</Link>

          
        </div>
      </div>
    );
  }
}
