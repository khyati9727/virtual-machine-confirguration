import React, { useState ,useEffect} from 'react';
import './App.css';
import Card from './Card';
import ChooseInstanceForm from './ChooseInstanceForm';
import ConfigureSecurity from './ConfigureSecurity';
import  CostEstimationBlock from './CostEstimatonBlock'
import StorageNetwork from './StorageNetwork';
import Summary from './Summary';
import WarningPopUp from './WarningPopUp';

export interface Image{
  id:number,
  name:string,
  description:string,
  region:number[], 
  x86:boolean,
  arm:boolean,
  cost:number
}

export interface Storage{
  type:string,
  volume:string,
  capacity:number,
  encrypted:boolean,
  iops:number,
  backup:boolean,
  remarks:string
}

export interface Form{
  formStatus:string,
  region:string,
  image:Image,
  cpuCores:number,
  memory:string,
  instanceType:string,
  storage:Storage[],
  network:number 
}

export interface Cost{
  item:string,
  cost:number
}

export interface CostCard{
  items:Cost[],
  total:number
}

const regionList:string[]=["US-East-1","Asia Pasific-Mumbai","US-West-1","India-1"]

function App() {
  
  const [currentRegion,setCurrentRegion]=useState<number>(-1);
  const [estimation,setEstimation]=useState<CostCard>({items:[],total:0.0});
  const [warning,setWarning]=useState<boolean>(false);
  const formMethods={form1:resetform1,form2:resetform2,form3:resetform3}

  const [formStatus,setFormStatus]=useState({
    changeImage:true,
    instanceType:false,
    storageNetwork:false,
    configureSecurity:false,
    review:false
  })
  const [formData,setFormData]=useState<Form>({
    formStatus:"Change Image",
    region:"",
    image:{
      id:-1,
      name:"",
      description:"",
      region:[],
      x86:true,
      arm:false,
      cost:0
    },
    cpuCores:-1,
    memory:"",
    instanceType:"",
    storage:[{
      type:"SSD",
      volume:"root",
      capacity:-1,
      encrypted:false,
      iops:100,
      backup:false,
      remarks:""}],
    network:-1
  })
  const [regionImages,setRegionImages]=useState<Image[]>([]);
  const [imagesAvailable]=useState<Image[]>([{
    id:1,
    name:"Linux image 2",
    description:"Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance.",
    region:[0,1,2,3],
    x86:true,
    arm:true,
    cost:243.61
  },
  {
    id:2,
    name:"Ubantu Server 18.04 LTS",
    description:"Ubantu 2 comes with 3 years of support. It provides Ubantu kernel 4.14 tuned for optimal performance.",
    region:[0,1,2,3],
    x86:true,
    arm:true,
    cost:243.61
  },
  {
    id:3,
    name:"Red hat Enterprise Linux 8",
    description:"Red hat Enterprise Linux 8 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
    region:[0,1,2,3],
    x86:true,
    arm:true,
    cost:300.00
  },
  {
    id:4,
    name:"Microsoft Windows Server 2019 Base",
    description:"Microsoft 8 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
    region:[0,2],
    x86:false,
    arm:true,
    cost:338.77
  },
  {
    id:5,
    name:"SUSE Linux Enterprise Server",
    description:"SUSE Linux comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance",
    region:[0,1,2,3],
    x86:true,
    arm:true,
    cost:200.22
  }
  ])


  function handleregion(event:any){
    // eslint-disable-next-line eqeqeq
    if((event.target.value==1 || event.target.value==3) && formData.image.name=="Microsoft Windows Server 2019 Base"){
      setWarning(true);      
    } 
    else{
      setCurrentRegion(event.target.value);
    }
  }

  function closewarning(){
    setWarning(false);
    var d:any = document.getElementById("regionMenu"); 
    var x:any=document.getElementById(""+currentRegion); 
    d.value=x.value;
    }

  function proceedwarning(){
    setWarning(false);
    var d:any = document.getElementById("regionMenu"); 
    console.log(currentRegion)
    // var x:any=document.getElementById(""+currentRegion); 
    d.value="Region";  
    setCurrentRegion(-1)
    setEstimation({items:[],total:0.0})
    removeData();
  }

  function removeData(){
    setFormData({...formData,
      formStatus:"Change Image",
      region:"",
      image:{
        id:-1,
        name:"",
        description:"",
        region:[],
        x86:true,
        arm:false,
        cost:0
      }
  })
  }
  
  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    const list:Image[]=[...imagesAvailable.filter((i)=>i.region.find(j=>j==currentRegion)==currentRegion)];
    setRegionImages(list);
    console.log(formData)
  }, [currentRegion,imagesAvailable,formData]); 


  function handleform1(fdata:Image){
    console.log(fdata)
    handlecostestimationform1(fdata);
    let i={...fdata};
    // eslint-disable-next-line eqeqeq
    if(fdata.x86==true && fdata.arm==true){
        i.arm=false;
    }
    else{
      i.x86=fdata.x86;
      i.arm=fdata.arm;
    }    
    let r=imagesAvailable[currentRegion].name
    setFormData({...formData,image:i,region:r,formStatus:"Choose Instance Type"})
    setFormStatus({...formStatus,instanceType:true,changeImage:false})
  }


  function handlecostestimationform1(img:Image){    
      setFormData({...formData,image:{...img}})
      setEstimation({items:[{item:img.name,cost:img.cost}],total:img.cost})
  }

  function handleform2(i:any){
   
    setFormStatus({...formStatus,storageNetwork:true,instanceType:false});
    setFormData({...formData,instanceType:i.instanceType,cpuCores:i.cpuCores,memory:i.memory,formStatus:"Choose Storage and Network"})
    console.log(formData)
  }

  function handleform3(i:any){
    setFormStatus({...formStatus,storageNetwork:false,configureSecurity:true});
    setFormData({...formData,storage:i.storage,network:i.network,formStatus:"Configure Security"})
    
  }
  function handleform4(){
    setFormStatus({...formStatus,review:true,configureSecurity:false});
    setFormData({...formData,formStatus:"Review & Launch"})
  }
  function resetform1(){
    setFormData({...formData,formStatus:"Choose Image"});
    setFormStatus({...formStatus,changeImage:true,instanceType:false,review:false});
    setEstimation({...estimation,items:[{item:formData.image.name,cost:formData.image.cost}]})
  }

  function resetform2(){
    setFormData({...formData,formStatus:"Choose Instance Type"});
    setFormStatus({...formStatus,storageNetwork:false,review:false,instanceType:true});
    let keywordcpu:string="CPU Cores - ";
    let extension:string=" cores"
    let keywordmemory:string="Memory - ";
    let list=estimation.items.filter((e)=>e.item===formData.image.name || e.item===keywordmemory+"32 GB" || e.item===keywordmemory+"64 GB" || e.item===keywordcpu+"8"+extension || e.item===keywordcpu+"16"+extension)
    setEstimation({...estimation,items:list})
  }
  
  function resetform3(){
    setFormData({...formData,formStatus:"Choose Storage and Network"});
    setFormStatus({...formStatus,storageNetwork:true,configureSecurity:false,review:false});
  }

  function resetform4(){
    setFormData({...formData,formStatus:"Configure Security"});
    setFormStatus({...formStatus,configureSecurity:true,review:false});
  }
  return (
  <div className="app">
    <div className="header"> 
      <p id="title" className="headerText">HVC</p>
    </div>
    <div className="pageparts">
    <div className="part1">
      <div className="titlerow">
  <h1 className="title">{formData.formStatus}</h1>     
        <div className="menubox">
        <select className="menu" id="regionMenu" onClick={handleregion} disabled={!formStatus.changeImage}>
              <option hidden>Region</option>
              {regionList.map((i,key) => ( 
             <option className="option" id={""+key} value={key} >{i} </option>
      ))}
          </select>
          </div>     
      </div>
       

                  {/* FORM STATUS */}
      <div className="statusbar">
          <div className={formStatus.changeImage?"activestatusblock":"statusblock"}>
            <p>1. Choose Image</p>
          </div>
          <div className={formStatus.instanceType?"activestatusblock":"statusblock"}>
            <p>2. Choose Instance Type</p>
          </div>
          <div className={formStatus.storageNetwork?"activestatusblock":"statusblock"}>
            <p>3. Choose Storage and network</p>
          </div>
          <div className={formStatus.configureSecurity?"activestatusblock":"statusblock"}>
            <p>4. Configure Security</p>
          </div>
          <div className={formStatus.review?"activestatusblock":"statusblock"}>
            <p>5. Review & Launch</p>
          </div>
      </div>

       

                {/* FIRST FORM */}
     {
       formStatus.changeImage?
       <div>{
        regionImages.map((item:Image) => (
          <div className="row">
          <div className="cardsArrangement">
        <Card image={item} handleform={handleform1} formstatus={formStatus.changeImage} costestimation={handlecostestimationform1} />
        </div>
        </div>
        ))}
          {warning? 
          <WarningPopUp firsttext="No" secondtext="Yes" firstfunction={closewarning} secondfunction={proceedwarning} />
      :null
      }
             
      </div>
             :null
      } 
     
                {/* SECOND FORM */}
      {
       formStatus.instanceType? 
        <div>
          <ChooseInstanceForm resetPrev={resetform1} estimation={estimation} setEstimation={setEstimation} handleform={handleform2}/>
        </div>
        :null
      }

     {/* THIRD FORM */}
        {
       formStatus.storageNetwork? 
        <div>
          <StorageNetwork resetPrev={resetform2} estimation={estimation} setEstimation={setEstimation} handleform={handleform3}/>
        </div>
        :null
      }

     {/* FOURTH FORM */}
        {
       formStatus.configureSecurity? 
        <div>
          <ConfigureSecurity resetPrev={resetform3} handleform={handleform4}/>
        </div>
        :null
      }

      {/* FIFTH FORM */}
     {
       formStatus.review? 
        <div>
          <Summary form={formData} cost={estimation} formMethod={formMethods} handleform={handleform1} costestimation={handlecostestimationform1}/>
        </div>
        :null
      }
      </div>
      <div className="part2">
          {/* COST ESTIMATION */}
       
       <aside>
           <CostEstimationBlock data={estimation} />
        </aside>
      </div> 
  </div>
  </div>
  );
}

export default App;
