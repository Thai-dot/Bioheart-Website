import React,{useEffect} from "react";
import "./styles.scss";
import svgImg from "../../../assets/images/svg/index";
import pngImg from "../../../assets/images/png/index";
import Button from "../buttonCT/index";
import { Link } from "react-router-dom";
import {Auth} from "@aws-amplify/auth";
import { useHistory } from "react-router";
import useMergeState from "../../../utils/hooks/useMergeState";
import fetchMe from "../../../services/apollo/functions/fetchMe";
import auth from "../../../utils/auth"
import moment from "moment";

const SidebarExpandCT = ({stateChanger}) => {
  const history = useHistory();
  const [state, setState] = useMergeState({
    user:{}
  });
  // useEffect(async () => {
  //   try {
  //     const dataDisplay = await fetchMe();
  //     setState({
  //       user: dataDisplay,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  async function signOut() {
    try {
        await Auth.signOut();
        history.push("/login");
        
        console.log('signed out');
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  return (
    <div className="mainSidebarExpand d-flex flex-column">
      <img
        src={svgImg.expandButtonClose}
        className="mt-4 expandButton"
        alt="expand button"
        width={32}
        height={32}
        onClick={() => stateChanger(false)}
      />

      <img
        src={pngImg.avatar}
        className="rounded-circle avatar centerImg "
        width={40}
        height={120}
        alt="avatar"
      />

      {/* <h5 className="text-center mt-3">{state.user?state.user.firstName + " "+ state.user.lastName:"Unknown user"}</h5> */}
      <h5 className="text-center mt-3">{auth.firstName()?auth.firstName()+ " "+ auth.lastName():"Unknown user"}</h5>
      {/* <h5 className="sidebar-title text-center">{state.user?state.user.role:"unknown"}</h5> */}
      <h5 className="sidebar-title text-center">{auth.role()?auth.role():"unknown"}</h5>

      <div className="d-flex align-items-center  mt-3 px-5">
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <div className="secondaryColor">Weight</div>
          {/* <div className="fw-bold mt-2"> {state.user?state.user.weight:"unknown"} kg</div> */}
          <div className="fw-bold mt-2"> {auth.weight()?auth.weight():"unknown"} kg</div>
        </div>
        <div className="vertical-stick mx-3"> </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="secondaryColor">Height</div>
          {/* <div className="fw-bold mt-2"> {state.user?state.user.height:"unknown"} cm</div> */}
          <div className="fw-bold mt-2"> {auth.height()?auth.height():"unknown"} cm</div>
        </div>
        <div className="vertical-stick mx-3"></div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="secondaryColor">Age</div>
          {/* <div className="fw-bold mt-2"> {state.user?moment().diff(state.user.dateOfBirth, 'years'):"unknown"} years</div> */}
          <div className="fw-bold mt-2"> {auth.dateOfBirth()?moment().diff(auth.dateOfBirth(), 'years'):"unknown"} years</div>
        </div>
      </div>

    <a href="/add_profile" className="customAtag2 mt-4 w-100">
      <button
        type="submit"
        className="rightFrameButton sidebarExpand whiteTextButton "
      >
        Edit profile
      </button>
    </a>


      <button
        type="submit"
        className="sign-out-button"
        onClick={()=>signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SidebarExpandCT;
