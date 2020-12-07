import React from 'react';
import './ErrorPopUp.css';
import './WarningPopUp.css';
import './ButtonPair.css'

interface IProps{
    text:string
    handlebutton:()=>void
}

function ErrorPopUp(props: IProps){
  return(
    <div className="background-blur">
    <div className="window">
        <p className="error">Error</p>
        <p className="error-detail">{props.text}</p>
        <div className="error-button-placement">
          <button className="ok-button" onClick={props.handlebutton}>OK</button>
        </div>
    </div>
</div>
  )
  }

export default ErrorPopUp;