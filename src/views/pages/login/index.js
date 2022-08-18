import React from "react";
import RightFrame from "./rightFrame/index";
import LeftFrame from "./leftFrame/index";
import MobileLogo from "./mobileLogo/index";
import "./leftFrame/styles.scss";
import { useState,useEffect } from "react";
import { Auth } from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useHistory } from "react-router";
import auth from "../../../utils/auth";



const signIn = () => {
  let [user, setUser] = useState(null)
  const history = useHistory();
 

  useEffect(() => {
    let updateUser = async authState => {
      try {
        let user = await Auth.currentAuthenticatedUser()
        setUser(user)
        history.push("/overview");
      } catch {
        setUser(null)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
    updateUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser) // cleanup
  }, [user]);






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
  )
}

export default signIn


