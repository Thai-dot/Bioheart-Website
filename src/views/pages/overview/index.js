import React, { useState, useEffect } from "react";
import NavCT from "../../components/navCT/index";
import HRCardCT from "../../components/hrCardCT/index";
import SidebarCT from "../../components/sidebarCT/index";
import SidebarExpandCT from "../../components/sidebarExpandCT/index";
import moment from "moment";
import useMergeState from "../../../utils/hooks/useMergeState";
import pngImg from "../../../assets/images/png/index";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./styles.scss";
import fetchMe from "../../../services/apollo/functions/fetchMe";
import { Auth } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router";
//import { chart1Config, chart2Config } from "./chartConfig";

import { useSelector,useDispatch  } from 'react-redux';
import highchartsMore from 'highcharts/highcharts-more';
import { symbol } from "prop-types";
import {getDataConfig1,getHeartRateIndex,getHeartRatesAverage,getDataConfig2} from "./recoil"
import {useRecoilValue } from "recoil"

highchartsMore(Highcharts);

function Overview () {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [state, setState] = useMergeState({
    isHasReport: true,
  });

  const dispatch = useDispatch()
  const history = useHistory();

  //fetch user information
  useEffect(async() => {
    const fectUser = await fetchMe();
    //console.log("fectUser", fectUser);
  }, []);


  const dataConfig1 = useRecoilValue(getDataConfig1)
  const heartRateIndex = useRecoilValue(getHeartRateIndex)
  const heartRatesAverage = useRecoilValue(getHeartRatesAverage)
  const dataConfig2 = useRecoilValue(getDataConfig2(heartRatesAverage.ceiledActiveMinutes))

 

  return (
    <div className="container-fluid  ">
      <div className="row ">
        <NavCT className="col-2" />
        <div className="col-10 position-relative mainView">
          <div className="container-fuild customContainer">
            <div className="d-flex justify-content-between">
              <h5 className="mb-4">Overview</h5>
              <div className="dateColor">
                {moment(new Date()).format("MMMM DD, YYYY")}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center ">
              <HRCardCT
                icon={"heart"}
                content={"Heart Rate"}
                index={120}
                unit={"bpm"}
                hasreport={state.isHasReport}
              />
              <div id="chart1">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={dataConfig1}
                />
              </div>
            </div>

            <div className="d-flex mt-3  justify-content-between">
              <HRCardCT
                icon={"heart"}
                content={"HR Variability"}
                index={heartRateIndex.hrv}
                unit={"ms"}
                hasreport={state.isHasReport}
              />
              <HRCardCT
                icon={"heart"}
                content={"Standing HR"}
                index={88}
                unit={"bpm"}
                hasreport={state.isHasReport}
              />
              <HRCardCT
                icon={"heart"}
                content={"Resting HR"}
                index={heartRateIndex.resting}
                unit={"bpm"}
                hasreport={state.isHasReport}
              />
              <HRCardCT
                icon={"heart"}
                content={"HR during activity"}
                index={91}
                unit={"bpm"}
                hasreport={state.isHasReport}
              />
            </div>
            <div className="row justify-content-between align-items-center mt-3">
              <div className="col-2">
                <HRCardCT
                  icon={"running"}
                  content={"Active minute"}
                  index={heartRatesAverage.activity}
                  index2 = {heartRatesAverage.sumOfDuration}
                  unit2={"bpm"}
                  unit={"min"}
                  hasreport={state.isHasReport}
                />
              </div>

              <div className="col-9 chartContainer2" id="chart2">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={dataConfig2}
                />
              </div>
            </div>

            {state.isHasReport ? (
              <div className="container-fluid p-0 mt-3">
                <div className="d-flex gap-2">
                  <div className=" report">
                    <div className="d-flex justify-content-between px-4 pt-3 align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <img src={pngImg.report1} alt="report icon 1" />
                        <div className="ms-2">Health Report</div>
                      </div>

                      <div className="recentColor">Recent</div>
                    </div>
                    <div className="fw-bold ms-5 ps-4 mt-2">
                      Dec 31, 2021 - Jan 6, 2022
                    </div>
                  </div>
                  <div className=" report">
                    <div className="d-flex justify-content-between px-4 pt-3 align-items-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <img src={pngImg.report2} alt="report icon 1" />
                        <div className="ms-2">Snaphot Report</div>
                      </div>

                      <div className="recentColor">Recent</div>
                    </div>
                    <div className="fw-bold ms-5 ps-4 mt-2">
                      Nov 8, 12:00:00 AM - 1AM
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* out of main container range */}
          {isOpenSideBar ? (
            <SidebarExpandCT stateChanger={setIsOpenSideBar} />
          ) : (
            <SidebarCT stateChanger={setIsOpenSideBar} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
