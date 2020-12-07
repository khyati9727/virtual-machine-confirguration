import React, { useState } from 'react';
import './StorageBlock.css';
import './App.css'

function StorageBlock(props: any){
    const [error,setError]=useState("")
    function handlestorage(event:any){        
        if(props.methodswork){
            let objectestimation=props.estimation 
            let itemlist=objectestimation.items
            // let i=itemlist.forEach({item:"Ext - "+props.storagelist[props.index].type,cost:(props.storagelist[props.index].type==="SSD"?20:40)}) 
            // console.log(i)
            // if(event.target.value==="SSD"){
            //     itemlist[i]={item:"Ext - SSD",cost:20}
            // }
            // else{
            //     itemlist[i]={item:"Ext - Magnetic Disk",cost:40}
            // }
            // console.log(i)
            props.setEstimation({...objectestimation,items:itemlist})    
            console.log(itemlist)
        let form=props.form;
        let list=[...props.storagelist];
        let element=list[props.index]
        console.log(element)
        element.type=event.target.value;
        list[props.index]=element
        props.setStoragelist(list)
        props.setCurrentForm({...form,storage:list})
        console.log(props.form)   
        }  
    }
    function encryption(){
        if(props.methodswork){
        let list=[...props.storagelist];
        let element=list[props.index]
        element.encrypted=!element.encrypted;
        list[props.index]=element
        props.setStoragelist(list)
        props.setCurrentForm({...props.form,storage:list})
        }
    }

    function backup(){
        if(props.methodswork){
        let list=[...props.storagelist];
        let element=list[props.index]
        element.backup=!element.backup;
        list[props.index]=element
        props.setStoragelist(list)
        props.setCurrentForm({...props.form,storage:list})
        console.log(props.form)
        }
    }

    function handleremarks(event:any){
        if(props.methodswork){
        let list=[...props.storagelist];
        let element=list[props.index]
        element.remarks=event.target.value;
        list[props.index]=element
        props.setStoragelist(list)
        props.setCurrentForm({...props.form,storage:list})
        console.log(props.form)
        }
    }

    function handleCapacity(event:any){
        if(props.methodswork){
        setError("");
        let list=[...props.storagelist];
        let element=list[props.index]
        element.capacity=event?.target.value;
        let min:number=element.type==="SSD"?20:40;
        let max:number=element.type==="SSD"?512:2000;
        if(element.type===""){
            setError("Please select the type first.")
        }
        else if(element.capacity<min || element.capacity>max){
            setError("invalid input, valid value range between "+min+" - "+max)
        }
        else if(element.capacity<100){
            element.iops=100;
        }
        else if(element.capacity>=100 && element.capacity<=500){
            element.iops=600;
        }
        else{
            element.iops=1000;
        }
        list[props.index]=element
        props.setStoragelist(list)
        props.setCurrentForm({...props.form,storage:list})
        console.log(props.form)
    }
    }

  return(
    <div className="storage-block">
    <div className="storage-grid">
     <div className="storage-column">
        <h4 className="storage-column-heading">Type</h4>
        
     </div>
     <div className="storage-column">
     <h4 className="storage-column-heading">Volume</h4>
   
     </div>
     <div className="storage-column">
     <h4 className="storage-column-heading">Capacity(GB)</h4>
     
     </div>
     <div className="storage-column">
     <h4 className="storage-column-heading">Encryption</h4>
    
     </div>
     <div className="storage-column">
     <h4 className="storage-column-heading">IOPS</h4>
    
    </div>
    <div className="storage-column">
     <h4 className="storage-column-heading">Backup Required</h4>
    
     </div>
     <div className="storage-column">
     <h4 className="storage-column-heading">Remarks</h4>
    
     </div>
    </div>
    <div className="storage-grid">    
    <div className="storage-menu-box">
    {props.methodswork?
        <select className="storage-menu" onClick={handlestorage}>
            
            <option hidden>Storage</option> 
            <option value="Magnetic Disk">Magnetic Disk</option>
            <option value="SSD">SSD</option>
           
        </select>
         :<select className="storage-menu" >
             <option >{props.storagelist[props.index].type}</option>
            </select>
        }
        </div> 

  <p className="root-content">{props.storagelist[props.index].volume}</p>
        <div className="input-capacity">
        <input type="number" value={props.storagelist[props.index].capacity===-1?"Capacity":props.storagelist[props.index].capacity} min={props.storagelist[props.index].type==="SSD"?"20":"40"} max="2000" className="input-content"  onChange={handleCapacity} placeholder="Capacity">
        </input>         
        </div>
        <input type="checkbox" className="check" onClick={encryption} checked={props.storagelist[props.index].encrypted}></input>
        <p className="root-content">{props.storagelist[props.index].iops}</p>
        <input type="checkbox" className="check" onClick={backup} checked={props.storagelist[props.index].backup}></input>
        <input type="text" className="input-content" value={props.storagelist[props.index].remarks} onChange={handleremarks} placeholder="Some Remarks"></input>
        </div>
        <span className="error-span">{error}</span>
    </div>
  )
  }

export default StorageBlock;