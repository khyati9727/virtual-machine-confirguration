import React from 'react';
import { CostCard, Form ,Storage} from './App';
import Card from './Card';
import './Summary.css';
import { Image } from './App';
import SummaryContainer from './SummaryContainer';
import StorageBlock from './StorageBlock';

interface IProps{
  form:Form 
  handleform:(formdata:Image)=>void;
  costestimation:(img:Image)=>void
  formMethod:{form1:()=>void,form2:()=>void,form3:()=>void},
  cost:CostCard
}

function Summary(props: IProps){
  const storagelist:Storage[]=props.form.storage;
  
  function download(content:any,fileName:any,contentType:any) {
   
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
   }
   
   function generate(){
     console.log({storagelist})
    download(`${JSON.stringify(props.form)} ${JSON.stringify(props.cost)}`,"form-data-json.json", "text/plain");
   }

   function resetform3(){
    props.formMethod.form3();
   }
   
  return(
    <div>
      <div className="row1">
        <button className="jsonbtn" onClick={generate}>Generate JSON</button>
      </div>
     <SummaryContainer name="Image" click={props.formMethod.form1}/>
      <div className="cardcontainer">
        <Card  formstatus={false} image={props.form.image} handleform={props.handleform} costestimation={props.costestimation}/>
      </div>
      <div className="row2">
      <SummaryContainer name="Instance" click={props.formMethod.form2}/>
      <div></div>
      <div className="summary-block">
        <h2 className="instance-heading">
          {props.form.instanceType}
        </h2> 
        <div className="data-rows">
          <div className="instance-left">
          <p className="instance-content">CPU {props.form.cpuCores}</p>
          <p className="instance-content">{props.form.memory} RAM</p>
          <p className="instance-content">Moderate Network Performance</p>
          </div> 
          <p>512 GB Storage</p>
        </div>
      </div>
      </div>
      <div className="storage-container">
      <SummaryContainer name="Storage" click={props.formMethod.form3}/>
      <div className="storage-placement">
        {
          storagelist.map((i:any,key:number)=>
           <StorageBlock storagelist={storagelist} methodswork={false} index={key} setCurrentForm={resetform3}/>
          )}     
      </div>
      </div>
    </div> 
  )
  }

export default Summary;