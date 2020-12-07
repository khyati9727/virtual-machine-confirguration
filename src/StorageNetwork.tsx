import React, { useState } from 'react';
import { Storage } from './App';
import ButtonPair from './ButtonPair';
import StorageBlock from './StorageBlock';
import './StorageNetwork.css';



function StorageNetwork(props: any){

  const [storagelist,setStoragelist]=useState<Storage[]>([{
    type:"",
    volume:"root",
    capacity:-1,
    encrypted:false,
    iops:100,
    backup:false,
    remarks:""}])
  const [currentForm,setCurrentForm]=useState<any>({
    storage:[{
    type:"SSD",
    volume:"root",
    capacity:-1,
    encrypted:false,
    iops:100,
    backup:false,
    remarks:""}],
    network:-1});

  function handleform(){
    let list=[...currentForm.storage]
    list.forEach((i)=>{if(i.capacity===-1){
      i.capacity=40;
    }})
    props.handleform(currentForm);
  }

  function deletestorage(event:any){
    let objectestimation={...props.estimation}
    let itemlist=objectestimation.items
    let i=itemlist.forEach((el:any,key:number)=>{
      if(el.item==="Ext - "+storagelist[event.target.value]){
        return key;
      }
      }) 
    itemlist.splice(i,1)
    props.setEstimation({...objectestimation,items:itemlist})
      let list=[...storagelist]
      console.log(event.target.value)      
      let x=list.splice(event.target.value,1);
      console.log(x);
      console.log(list)
      setStoragelist([...list]) 
  }

  function addVolume(){
      let objectestimation={...props.estimation}
      let itemlist=objectestimation.items
      itemlist.push({item:"Ext - SSD",cost:20}) 
      console.log(itemlist)
      props.setEstimation({...objectestimation,items:itemlist})
      let list=[...storagelist]
      let element={
        type:"SSD",
        volume:"ext",
        capacity:-1,
        encrypted:false,
        iops:100,
        backup:false,
        remarks:""}
        list.push(element); 
        setStoragelist([...list]) 
  }



  return(
   <div>
     {
       storagelist.map((i:any,key:number)=>(
     <div className="postion">
     <StorageBlock form={currentForm} setEstimation={props.setEstimation} estimation={props.estimation}  methodswork={true} setCurrentForm={setCurrentForm} storagelist={storagelist} index={key} setStoragelist={setStoragelist}/>
     <div>
       {
       i.volume!=="root"?
          <button className="cross-btn" value={key} onClick={deletestorage}>X</button>
          :null
       }           
     </div>
     </div>
       ))
      }
     <div>
       <button className="volume" onClick={addVolume}>Add Volume</button>
     </div> 
     <div> 
       <h1 className="heading-network">Network Bandwidth Configuration</h1>
       <p className="data">Outbounded Traffic</p>
       <div className="slidecontainer">
        <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
        </div>
        <div className="network-range">
            <p>256GB</p><p>2TB</p>
        </div>
     </div>
     <div className="position-btn"> 
       <ButtonPair firsttext="Back" firstfunction={props.resetPrev} secondtext="Proceed" secondfunction={handleform} />
     </div>
    </div> 
  )
  } 

export default StorageNetwork;