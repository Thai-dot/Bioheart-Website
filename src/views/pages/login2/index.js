import React from "react";
import "./styles.scss";
import RightFrame from "./rightFrame/index";
import LeftFrame from "./leftFrame/index";
import MobileLogo from "./mobileLogo/index";

class Login extends React.Component {
  render() {
    return (
      <div>
        <MobileLogo />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-5 col-md-6 col-lg-8 p-0 bigleft">
              <LeftFrame />
            </div>
            <div className="col-7 col-md-6 col-lg-4 p-0 bigright">
              <RightFrame />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
