import React, { useState, useEffect } from "react";
import NavCT from "../../components/navCT/index";
import SidebarCT from "../../components/sidebarCT/index";
import SidebarExpandCT from "../../components/sidebarExpandCT/index";
import SnapshotChartCT from "../../components/snapshotChartCT/index";
import "./styles.scss";
import svgImg from "../../../assets/images/svg/index";
import svg from "../../../assets/images/svg/index";

const Snapshot = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row">
        <NavCT className="col-2" />
        <div className="col-10 position-relative mainView">
          <div className="container-fuild customContainer">
            <div className="d-flex align-items-center">
              <div className="justify-content-center snapshotInput d-flex align-items-center ">
                <img
                  src={svgImg.searchIcon}
                  alt="search icon"
                  width={17}
                  height={17}
                  className="cursor-pointer"
                />
                <input type="text" className="snapshotInputChild" />
                <img
                  src={svgImg.filterIcons}
                  alt="filter icons"
                  width={17}
                  height={17}
                  className="cursor-pointer"
                />
              </div>
              <button
                type="submit"
                className="rightFrameButton rightFrameButtonSnapshot whiteTextButton mt-0 ms-4"
                //onClick={() => signIn()}
              >
                Create Snapshot +
              </button>
            </div>
            
            <div className="row mt-3 px-4">
             
              <div className="col-4 p-0 snapshotLeftFrame">
                  <div className="d-flex align-items-center p-2 justify-content-around">
                      <div>
                        All
                      </div>
                      <div>
                        Recent
                      </div>
                      <div>
                        Pending
                      </div>
                  </div>
                 

                <SnapshotChartCT />
                <SnapshotChartCT />
                <SnapshotChartCT />


              </div>
              <div className=" ms-3 snapshotRightFrame p-0 ">
                  <div className="snapshotDetailHeader justify-content-between align-items-center d-flex ">
                        <div className="ms-4 snapshotHeaderText">
                        Snapshot detail
                        </div>
                        <div className="twoIcon me-4 d-flex">
                            <img src={svgImg.rubbishIcon} width={24} height={24} className="me-4" alt="rubbish icon" />
                            <img src={svgImg.pdfIcon} width={24} height={24} alt="pdf icon" />
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

export default Snapshot;
