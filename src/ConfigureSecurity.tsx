import React, { useEffect, useState } from 'react';
import ButtonPair from './ButtonPair';
import './ConfigureSecurity.css';



interface IProps{
  resetPrev:()=>void,
  handleform:()=>void
}
function ConfigureSecurity(props: IProps){
  function handleform(){
    props.handleform();
  }
  return(
   <div>
     <div>
     <ButtonPair firsttext="Back" firstfunction={props.resetPrev} secondtext="Proceed" secondfunction={handleform} />
     </div>
    </div>
  )
  }

export default ConfigureSecurity;