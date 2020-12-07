import React, { useEffect, useState } from 'react';
import './ChooseInstanceForm.css';
import './App.css'
import ErrorPopUp from './ErrorPopUp';
import ButtonPair from './ButtonPair';
import { Cost } from './App';

export interface Instance{
    instanceType:string,
    memory:string[],
    cpuCores:number[]
}

const instance:Instance[]=[{
    instanceType:"General Purpose",
    memory:["256 MB","512 MB","1 GB","2 GB","4 GB"],
    cpuCores:[1,2,4]
},
{
    instanceType:"Storage Optimized",
    memory:["16 GB","32 GB","64 GB"],
    cpuCores:[1,8,16]
},
{
    instanceType:"Compute Optimized",
    memory:["16 GB","32 GB","64 GB"],
    cpuCores:[1,2,8,16]
},
{
    instanceType:"Network Optimized",
    memory:["256 MB","512 MB","1 GB","2 GB","4 GB","16 GB","32 GB","64 GB"],
    cpuCores:[1,2,4,8,16]
}
]    

function ChooseInstanceForm (props:any){

    const [errorPop,setErrorPop]=useState(false);
    const [errorText,setErrorText]=useState("");
    const [currentForm,setCurrentForm]=useState({
        instanceType:"General Purpose",
        memory:"",
        cpuCores:-1
        })
        
        useEffect(() => {
            
        }, [])

    function handleform(){
        if(currentForm.cpuCores===-1 || currentForm.memory===""){
            setErrorText("Please select all the fields, Instance Type, CPU Core and memory in order to Proceed.")
            setErrorPop(true);
        }
        else{
            console.log("sending App")
            props.handleform(currentForm);

        }        
    }   
        function handletypechange(event:any){            
           
            let name:string=event.target.value;
            let i:any=instance.find(e=>e.instanceType===name);
            if(i!==undefined){
            let cpu;
            if(i.cpuCores!==undefined){
            i.cpuCores.forEach((element:any) => {       //CHECKING CPU TYPE AVAILABLE
                // eslint-disable-next-line eqeqeq
                if(element==currentForm.cpuCores){
                    cpu=true;
                    return
                }
            });
            }
            let mem=i.memory.includes(currentForm.memory);  //CHECKING MENU AVAILABLE
            cpu=currentForm.cpuCores===-1?true:cpu;         //IF PREVIOUSLY SELECTED CPU
            mem=currentForm.memory===""?true:mem;           //IF PREVIOUSLY SELECTED MEMORY
            let keywordcpu:string="CPU Cores - ";
            let extension:string=" cores"
            let keywordmemory:string="Memory - ";
            let list=[];

            // if(currentForm.cpuCores!==-1 && cpu){
            //     let menu:any = document.getElementById("cpu"); 
            //     let option:any = document.getElementById("hidden"); 
            //     console.log(option)
            //     console.log(menu)
            //     option.value=currentForm.cpuCores.toString
            //     console.log(option)
            //     menu.value=option.value;
            // }
            if(!cpu && !mem){
                setErrorText(currentForm.cpuCores+"cpu core and "+currentForm.memory+" are not available for "+name)
                setErrorPop(true)
                setCurrentForm({instanceType:event.target.value,cpuCores:-1,memory:""})
                var d:any = document.getElementById("cpu"); 
                d.value="CPU Cores";   
                var b:any=document.getElementById("memory"); 
                b.value="Memory";    
                list=[...props.estimation.items.filter((e:any)=>e.item!==keywordcpu+8+extension && e.item!==keywordcpu+16+extension && e.item!==keywordmemory+"64 GB" && e.item!==keywordmemory+"32 GB")]    
                props.setEstimation({items:list})
            }
            else if(!cpu){
                setErrorText(currentForm.cpuCores+"cpu core is not available for "+name)
                setErrorPop(true)
                setCurrentForm({...currentForm,instanceType:event.target.value,cpuCores:-1})
                var x:any = document.getElementById("cpu"); 
                x.value="CPU Cores"; 
                list=[...props.estimation.items.filter((e:any)=>e.item!==keywordcpu+8+extension && e.item!==keywordcpu+16+extension)]    
                props.setEstimation({items:list})
            }
            else if(!mem){
                setErrorText(currentForm.memory+" is not available for "+name)
                setErrorPop(true)
                setCurrentForm({...currentForm,instanceType:event.target.value,memory:""})
                var y:any=document.getElementById("memory"); 
                y.value="Memory";  
                list=[...props.estimation.items.filter((e:any)=>e.item!==keywordmemory+"64 GB" && e.item!==keywordmemory+"32 GB")]
                props.setEstimation({items:list})
            }

            else{
                setCurrentForm({...currentForm,instanceType:event.target.value});
            }
                
        }
        }

        function close(){
            setErrorPop(false)
        }

        function handlecpu(e:any){
            let keyword:string="CPU Cores - ";
            let value=e.target.value;
            let extension:string=" cores"
            console.log("handle CPU")
            let list:Cost[]=[];
            let t=0;
            if(currentForm.cpuCores!==value){
              list=[...props.estimation.items.filter((e:any)=>e.item!==keyword+8+extension && e.item!==keyword+16+extension)]
            }
            // eslint-disable-next-line eqeqeq
            if(value==8){
                list.push({item:keyword+value+extension,cost:20});
                t=props.estimation.total; 
                t=t+20;
            }
            // eslint-disable-next-line eqeqeq
            if(value==16){
                list.push({item:keyword+value+extension,cost:40});
                t=props.estimation.total;
                t=t+40;                
            }
            setCurrentForm({...currentForm,cpuCores:value})
            props.setEstimation({items:list,total:t})
          
        }

        function handlememory(e:any){
            let keyword:string="Memory - ";
            let value=e.target.value;
            let list:Cost[]=[];
            let t=0;
            if(currentForm.memory!==value){
              list=[...props.estimation.items.filter((e:any)=>e.item!==keyword+"64 GB" && e.item!==keyword+"32 GB")]
            }
            if(value==="32 GB"){
                list.push({item:keyword+value,cost:20});
                t=props.estimation.total; 
                t=t+20;
            }
            if(value==="64 GB"){
                list.push({item:keyword+value,cost:40});
                t=props.estimation.total;
                t=t+40;                
            }
            setCurrentForm({...currentForm,memory:value})
            props.setEstimation({items:list,total:t})
    }
    return(
        <div>
    <div className="optionsrow">
        {
            instance.map((item:Instance) => (
                <button  className={item.instanceType===currentForm.instanceType?"activeblock":"block"} value={item.instanceType} onClick={(e)=>handletypechange(e)}>
                    {item.instanceType}
                    </button>
                ))
        }
        <div>

        </div>
    </div>
    <div className="headingform2"> 
        <h3>Create Configuration</h3>
    </div>
    <div className="menurow">
    <div className="menubox">
       
        <select className="menu" id="cpu" onClick={handlecpu}>
              <option id="hidden" value="" hidden>CPU Cores</option>
              {
              instance.find((i:Instance)=>i.instanceType ===currentForm.instanceType)?.cpuCores.map((e)=>
             <option className="option" id={currentForm.instanceType+""+e} value={e} >{e} </option>)
      }
          </select>
          </div>     
          <div className="menubox">
              <select className="menu" id="memory" onClick={handlememory}>
              <option hidden>Memory</option>
              {
              instance.find((i:Instance)=>i.instanceType ===currentForm.instanceType)?.memory.map((i)=>
              <option className="option" id={i} value={i} >{i} </option>)
      }
          </select>
          </div>     
    </div>
    <div>
        <ButtonPair firsttext="Back" firstfunction={props.resetPrev} secondtext="Proceed" secondfunction={handleform}/>
    </div>
    <div>
        { errorPop?
            <ErrorPopUp text={errorText} handlebutton={close}/>
            :null
        }
    </div>
</div>

    )
}

export default ChooseInstanceForm;