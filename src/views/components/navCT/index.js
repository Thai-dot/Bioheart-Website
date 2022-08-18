import React,{useState,useEffect} from "react";
import pngImg from "../../../assets/images/png/index";
import svg from "../../../assets/images/svg/index";
import svgImg from "../../../assets/images/svg/index";
import {Link} from "react-router-dom";
import useMergeState from "../../../utils/hooks/useMergeState"

import "./styles.scss";

const NavCT = ({ className }) => {
  const [state, setState] = useMergeState({
    isHoverOverview: false,
    isHoverHeartSummary: false,
    isHoverSnapshot: false,
    isHoverReport: false,
    pathName: window.location.pathname
  });

  const handleMouseIn = (condition) => {
    if(condition === "overview"){
    setState({
      isHoverOverview:true
    });
  }
  if(condition === "heartSummary"){
    setState({
      isHoverHeartSummary:true
    });
  }
  if(condition === "snapshot"){
    setState({
      isHoverSnapshot:true
    });
  }
  if(condition === "report"){
    setState({
      isHoverReport:true
    });
  }

  }

  const handleMouseOut = () => {
    setState({
      isHoverOverview:false,
      isHoverHeartSummary:false,
      isHoverSnapshot:false,
      isHoverReport:false
    });
  }

  useEffect(() => {
  setState({
    pathName: window.location.pathname
  } )
  },[window.location.pathname])

  return (
    <div className={className}>
      <div className="d-flex flex-column">
        <a href="/">

        <img
          src={pngImg.bioheart}
          className="img-fluid mt-4 mx-4"
          width={140}
          height={37.62}
          
          alt="bioheart-logo"
        />
        </a>
        <div className="d-flex justify-content-center p-4 align-items-start flex-column navItems">
          <Link onMouseOver={() => {handleMouseIn("overview")}} onMouseOut={()=>{handleMouseOut()}} to="/overview" className={state.pathName === "/overview"?"d-flex justify-content-start navItem mt-4 mb-4 activeItem":"d-flex justify-content-start navItem mt-4 mb-4" }>
            <img
              src={state.isHoverOverview || state.pathName === "/overview"?svgImg.overviewIconFilter :svgImg.overviewIcon}
              className="img-fluid me-2"
              width={18}
              height={18}
              alt="nav-icon1"
            />
            <div >Overview</div>
          </Link>
          <Link onMouseOver={() => {handleMouseIn("heartSummary")}} onMouseOut={()=>{handleMouseOut()}} to="/heart_summary" className={state.pathName === "/heart_summary"?"d-flex justify-content-start navItem  mb-4 activeItem":"d-flex justify-content-start navItem  mb-4" }>
            <img
              src={state.isHoverHeartSummary ||state.pathName === "/heart_summary" ?svgImg.heartSummaryIconFilter : svgImg.heartSummaryIcon}
              className="img-fluid me-2"
              width={18}
              height={18}
              alt="nav-icon1"
            />
            <div>Heart Summary</div>
          </Link>
          <Link  onMouseOver={() => {handleMouseIn("snapshot")}} onMouseOut={()=>{handleMouseOut()}} to="/snapshot" className={state.pathName === "/snapshot"?"d-flex justify-content-start navItem  mb-4 activeItem":"d-flex justify-content-start navItem  mb-4"}>
            <img
              src={state.isHoverSnapshot||state.pathName === "/snapshot"?svgImg.snapshotIconFilter : svgImg.snapshotIcon}
              className="img-fluid me-2"
              width={18}
              height={18}
              alt="nav-icon1"
            />
            <div>Snapshot</div>
          </Link>
          <Link to="report" onMouseOver={() => {handleMouseIn("report")}} onMouseOut={()=>{handleMouseOut()}} className="d-flex  navItem mb-4">
            <img
              src={state.isHoverReport || state.pathName === "/report"?svgImg.healthReportIconFill: svgImg.healthReportIcon}
              className="img-fluid me-2"
              width={18}
              height={18}
              alt="nav-icon1"
            />
            <div>Health Report</div>
          </Link>
          <Link to="/support" className="d-flex  navItem mb-4">
            <img
              src={svgImg.supportIcon}
              className="img-fluid me-2"
              width={18}
              height={18}
              alt="nav-icon1"
            />
            <div>Support</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavCT;
