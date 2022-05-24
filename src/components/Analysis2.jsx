import React from 'react'
import '../App.css'


function Analysis2(props) {
  return (
    <div className="popup-box">
      <div className="box2">
        <span className="close-icon2 rules" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
}

export default Analysis2