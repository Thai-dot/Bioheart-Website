import React from "react";
import svgImg from "../../../assets/images/svg/index";
import "./styles.scss";
import SnapshotTag from "../snapshotTag/index";

const SnapshotChart = () => {
  return (
    <>
      <div className="snapshotDate py-2 ps-2">Nov 8, 12:00:00 AM</div>

      <div className="d-flex justify-content-around align-items-center mt-2">
        <img src={svgImg.clockIcon} alt="clock icon" width={17} height={17} />
        <div>Nov 13, 10:45:34 AM</div>
        <img
          src={svgImg.informationIcon}
          alt="arrow right"
          width={17}
          height={17}
        />
      </div>
      <div className="snapshotChartContent">
        <div className="snapshotChart">...loading</div>
        <div className="d-flex justify-content-between align-items-center px-2">
          <div className="snapshotMinutes">1 min</div>
          <div className="snapshotPending snapshotResult  ">
            Getting Heart Rhythm
          </div>
        </div>
      </div>
      <div className="snapshotContainTag ms-4 mt-0 row">
        <SnapshotTag content="abc" />
        <SnapshotTag content="abasdasdc" />
        <SnapshotTag content="abdfvcvc" />
      </div>
      <div className="snapshotComment">
      Amet minim mollit non deserunt ullamco 
      </div>
    </>
  );
};

export default SnapshotChart;
