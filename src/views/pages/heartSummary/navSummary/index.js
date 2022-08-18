import React from "react";
import "./styles.scss";

const NavSummary = () => {
  return (
    <div>
      <ul className="ps-2">
        <li className="summary-list active">Heart rate</li>
        <li className="summary-list">Standing Heart rate</li>
        <li className="summary-list">Resting Heart rate</li>
        <li className="summary-list">Heart rate variability</li>
        <li className="summary-list" >HR during activity</li>
      </ul>
    </div>
  );
};

export default NavSummary;
