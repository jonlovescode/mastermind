import React from 'react'
import '../App.css'


function Login(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon rules" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
}

export default Login