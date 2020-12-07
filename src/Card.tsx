import React, { useState } from 'react';
import './Card.css';
import './App.css';
import { Image } from './App';


interface IProps{
  image: Image;
  handleform:(formdata:Image)=>void;
  costestimation:(img:Image)=>void;
  formstatus:boolean;
}

function Card(props: IProps){

  const [formData1,setFormData1]=useState<Image>({...props.image});
  
  function handleRadio(event:any){
    
    props.costestimation(props.image)
  
    if(event.target.id==="x86"){
      setFormData1({...formData1,x86:true,arm:false});
    }
    else{
      setFormData1({...formData1,x86:false,arm:true});
    }
  }

  return(
    <div className="mainpart"> 
      <div className="card">
        <div className="cardimg">
        </div>
        <div className="cardDetails">
          <h1 className="cardname">{props.image.name}</h1>
          <p className="cardDescription">{props.image.description}</p>
        </div>
        <div className="cardpart3">
          { 
          props.image.x86 && props.image.arm && props.formstatus ?
          <div >
          <div >
            <input type="radio"  id="x86" name={props.image.name} defaultChecked onClick={(e)=>handleRadio(e)}></input>
            <label>64-Bit (x86)</label>
          </div>
            <div>
            <input type="radio" id="ARM" name={props.image.name} onClick={(e)=>handleRadio(e)}></input>
            <label>64-Bit (ARM)</label>
            </div>
            </div>
            : null
            }
            {
              props.image.x86 && props.image.arm ?
              null:<div>
                 <label id={props.image.x86?"64-Bit (x86)":"64-Bit (ARM)"}  onClick={(e)=>handleRadio(e)}>{props.image.x86?"64-Bit (x86)":"64-Bit (ARM)"}</label>
                </div>
            }
            { 
              props.formstatus?
              <div className="selectbuttonposition">
            <button className="button" onClick={(event) => props.handleform(formData1)}>Select</button>
            </div>
            :null
            }
            
        </div>
      </div>
    </div>
  )
  
          }

export default Card;