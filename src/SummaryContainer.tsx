import React from 'react';
import './SummaryContainer.css';

interface IProps{
  click:()=>void
  name:string
}

function SummaryContainer(props: IProps){
  return(
    <div className="title-summary"> 
      <h2 className="heading">{props.name}</h2>
      <p className="edit" onClick={props.click}>edit</p>
    </div> 
  )
  }

export default SummaryContainer;