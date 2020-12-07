import React from 'react';
import ButtonPair from './ButtonPair';
import './WarningPopUp.css';

interface IProps{
    firsttext:string,
    secondtext:string,
    firstfunction:(event:any)=>void
    secondfunction:(event:any)=>void,
}

function WarningPopUp(props: IProps){
  return(
    <div className="background-blur">
    <div className="window">
        <p className="warning">Warning</p>
        <p className="warning-detail">Windows is only available in us-east-1 and India-1. If you proceed you may lose data.</p>
        <div className="warning-button-placement">
          <ButtonPair firsttext={props.firsttext} secondtext={props.secondtext} firstfunction={props.firstfunction} secondfunction={props.secondfunction}/>
        </div>
    </div>
</div>
  )
  }

export default WarningPopUp;