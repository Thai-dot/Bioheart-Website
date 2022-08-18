import React, { useState, useEffect } from "react";
import NavCT from "../../components/navCT/index";
import "./styles.scss";
import SidebarCT from "../../components/sidebarCT/index";
import SidebarExpandCT from "../../components/sidebarExpandCT/index";
import NavSummary from "./navSummary";
import svgImg from "../../../assets/images/svg";
import { getCustomHeartRates } from "../../../utils/getDataForChart";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { useRecoilValue, useRecoilState } from "recoil";
import { getChartConfig, getSetDateType,getChartConfig2 } from "./recoil";
import useMergeState from "../../../utils/hooks/useMergeState";

highchartsMore(Highcharts);

const HeartSummary = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const chartTabList = [
    {
      text: "Hour",
      id: 1,
    },
    {
      text: "Day",
      id: 2,
    },
    {
      text: "Week",
      id: 3,
    },
    {
      text: "Month",
      id: 4,
    },
    {
      text: "Year",
      id: 5,
    },
  ];
  const [state, setState] = useMergeState({
    activeId: 1,
    dataConfig: [],
  });

  const [dateType, setDateType] = useRecoilState(getSetDateType);
  const dataConfig = useRecoilValue(getChartConfig)


  const handleOnclickDateType = (id) => {
    setState({ activeId: id });
    //find text by id
    const text = chartTabList.find((item) => item.id === id).text;

    if(id ===1){
      setDateType("Hour");
      const dataConfig = useRecoilValue(getChartConfig)
      setState({ dataConfig });
    }else if(id ===2){
      setDateType("Day");
      const dataConfig = useRecoilValue(getChartConfig2)
      setState({ dataConfig });
    }

  };

  return (
    <div className="container-fluid">
      <div className="row">
        <NavCT className="col-2" />
        <div className="col-10 position-relative mainView">
          <div className="container-fluid customContainer">
            <div className="fw-bold ms-2">Heart Summary</div>
            <div className="d-flex summaryBackground">
              <div className="d-flex flex-column rightBackgroundBorder ms-0 ps-0 pe-2  ">
                <NavSummary />
              </div>
              <div className=" left-summary justify-content-center w-100 position-relative  ">
                <div className="d-flex justify-content-center">
                  <ul className="d-flex p-0 mt-4 chartTabGroup">
                    {chartTabList.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={
                            state.activeId === item.id
                              ? "chartTabGroupItemActive chartTabGroupItem "
                              : "chartTabGroupItem"
                          }
                          onClick={() => handleOnclickDateType(item.id)}
                        >
                          {item.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="navigateDate justify-content-center d-flex align-items-center">
                  <img
                    src={svgImg.leftArrowActiveWithoutBorder}
                    alt="arrow-left"
                    width={18}
                    height={18}
                    className="me-4"
                  />
                  <div className="dateShow text-center navigateDateContent">
                    December 28, 9 AM - 10 AM
                  </div>
                  <img
                    src={svgImg.rightArrowInactiveWithoutBorder}
                    alt="arrow-right"
                    width={18}
                    height={18}
                    className="ms-4"
                  />
                </div>

                <div id="chart3">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={state.dataConfig}
                  />
                </div>

                <div className="indexFrame d-flex justify-content-center">
                  <div className="indexFrameItem">
                    <div className="indexFrameItemLabel">Min rate</div>
                    <div className="indexFrameItemValue">83</div>
                  </div>
                  <div className="indexFrameItem">
                    <div className="indexFrameItemLabel">Avg rate</div>
                    <div className="indexFrameItemValue">98</div>
                  </div>
                  <div className="indexFrameItem">
                    <div className="indexFrameItemLabel">Max rate</div>
                    <div className="indexFrameItemValue">112</div>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <button className="heartButton d-flex justify-content-center align-items-center">
                    <div>View Heart Rhythm</div>
                    <span>
                      <img
                        src={svgImg.whiteRightArrow}
                        alt="arrow-right"
                        width={18}
                        height={18}
                        className="ms-2 "
                      />
                    </span>
                  </button>
                </div>

                <div className="d-flex flex-column reportHeart ">
                  <div className="reportHeartLabel">About Heart rate</div>
                  <div className="reportHeartValue">
                    Your heart rate, or pulse, is the number of times your heart
                    beats per minute. Normal heart rate varies from person to
                    person. As you age, changes in the rate and regularity of
                    your pulse can change and may signify a heart condition or
                    other condition that needs to be addressed
                  </div>
                </div>
              </div>
            </div>
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

export default HeartSummary;
