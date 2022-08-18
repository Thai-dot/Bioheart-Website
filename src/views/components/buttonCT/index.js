import React, { useState, useEffect } from 'react';
import './styles.scss';

function ButtonCT(props) {
  return (
    <button type="submit" onClick={()=>props.onClick()} className={'d-flex flex-row justify-content-center  align-items-center '+ props.myButton.style} >
      <img src={props.myButton.img}  alt={props.myButton.name} className="me-2"/>

      {props.myButton.content}
    </button>
  );
}

export default ButtonCT;
