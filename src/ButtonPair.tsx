import React from 'react';

import './ButtonPair.css';


interface IProps{
 firstfunction:(event:any)=>void
 secondfunction:(event:any)=>void,
 firsttext:string,
 secondtext:string
 }


const ButtonPair: React.FC<IProps> = (props: IProps)=>(
    <div className="arrangebutton">
        <button className="buttonback" onClick={props.firstfunction}>
            {props.firsttext}
        </button>
        <button className="buttonproceed" onClick={(e)=>props.secondfunction(e)}>
            {props.secondtext}
        </button>   
         </div>
)

export default ButtonPair