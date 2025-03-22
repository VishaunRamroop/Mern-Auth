
import {Check,X} from 'lucide-react';
import useAuth from '../contexts/Auth_Context';
import './Custom_Components.css'
function PasswordCriteria({password,color}){
const {strength,setStrength}= useAuth()
  const criteria= [
    {label:'Password must be atleast 6 characters',met:password.length>=6},
    {label:'Password must contain atleast 1 uppercase', met: /[A-Z]/.test(password)},
    {label:'Password must contain lowercase characters',met:/[a-z]/.test(password)},
    {label:'Password must contain atleast 1 number',met:/[\d]/.test(password)},
    {label:'Password must contain atleast 1 special character',met:/[^A-Za-z0-9]/.test(password)},
  ]
  return <div className="">

    {criteria.map((item,index)=>{
  return <div className="password-container" key={index}>
     {   item.met ? <h3 className='password-container-transition-change'><Check/></h3>:<h3 className='password-container-transition-change'> <X/></h3>}
     <h3 className='password-container-transition-change' style={{color:color}}>{item.label}</h3>
      </div>
       
    })}
        
  </div>
}


export default function PasswordChecker({password}) {
  const {strength,setStrength}= useAuth()
function getStrength(pass){
  let str=0;
  if(pass.match(/[A-Z]/)) str ++;
  if(pass.match(/[a-z]/)) str ++;
  if(pass.match(/\d]/)) str ++;
  if(pass.match(/[^A-Za-z0-9]/)) str ++;
  if(pass.length >=6) str ++;
  return str;
}

let colorSTR =getStrength(password)
setStrength(colorSTR)
console.log(colorSTR)
function getCriteriaColor(){

  if(colorSTR ===1 ) return'#FB4141'
  if(colorSTR ===2) return '#FF885B'
  if(colorSTR ===3) return '#F3C623'
  if(colorSTR ===4) return '#118B50'
}
const color = getCriteriaColor(colorSTR)

  return (
  <div className="">
    {<PasswordCriteria color={color} password= {password}/>}
  </div>
  )
}
