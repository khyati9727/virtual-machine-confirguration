import React, { useEffect, useState } from 'react';
import './CostEstimationBlock.css';
import { Cost, CostCard } from './App';

interface IProps{
  data:CostCard;
  
}


function CostEstimationBlock(props:IProps){

   const [total,setTotal]=useState(0);

   useEffect(() => {
   let t=0;
     props.data.items.forEach(e=>t+=e.cost)
     setTotal(t)     
    }, [props.data.items])
  
   return(
     <div className="costblock">
         <div className="costblockcontent">
            <h1>Cost Estimation</h1>
            <div>
            {
               props.data.items.map((i:Cost) =>
                    <div className="costrow">
                        <p className="cost-content">{i.item}</p>
                        <p className="cost-content"> ${i.cost}</p>
                    </div>
              )
            }
            </div>
         </div>
         <div className="line"></div>
        <p className="total" > ${total}/mo</p>        
        
     </div>
     )
}

export default CostEstimationBlock;