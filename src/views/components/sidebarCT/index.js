import React,{useEffect} from 'react'
import "./styles.scss"
import svgImg from "../../../assets/images/svg/index";
import pngImg from "../../../assets/images/png/index";
import {Auth} from "@aws-amplify/auth";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {logoutRequest} from "../../../redux/actions/login";


const SidebarCT = ({stateChanger}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const items = JSON.parse(window.localStorage.getItem('login'));
  //   if(!items){
  //     history.push('/login');
  //   }
  // }, [JSON.parse(window.localStorage.getItem('login'))]);



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
    <div className='mainSidebar d-flex flex-column '>
        <img src={svgImg.expandButton} className="mt-4 expandButton" alt="expand button" width={32}
              height={32} onClick={() => stateChanger(true)} />
        
        <div className='d-flex flex-column justify-content-center align-items-center belowSidebarComponents '>
          <img src={pngImg.avatar} className="rounded-circle avatar " width={40}
              height={40} alt="avatar" onClick={() => stateChanger(true)} />
            
           <Link to="/add_profile" className='p-0 m-0 mt-4 customAtag'>

                <img  src={svgImg.penButton} alt=" penButton" width={33}
              height={33} className="m-0 img-fluid" onClick={() => stateChanger(true)} />
           </Link>
            
              <div className='sidebar-stick mt-4' />

              
                <img src={svgImg.logoutButton}  onClick={()=>dispatch(logoutRequest())} className="mt-4" alt=" logoutButton" width={33} height={33} />

        </div>
    </div>
  )
}

export default SidebarCT