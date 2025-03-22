import {useState,useRef,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../contexts/Auth_Context';
import './EmailVerification.css';
import toast from 'react-hot-toast';
export default function EmailVerification() {
  const [code,setCode]= useState(['','','','','','']);
  const inputRefs = useRef([]);
  const nav = useNavigate();
const {verifyUser,user}= useAuth();



  function handleChange(index,value){
   const newCode = [...code];
   if(value.length >1){
    const pasteCode = value.slice(0,6).split("")
    for(let i =0;i<6;i++){
        newCode[i]= pasteCode[i]|| ""
    }
    setCode(newCode)
    const last =newCode.findLastIndex((item)=>item!=='');
    const focus = last <5?last+1:5;
    inputRefs.current[focus].focus()
   }else{
    newCode[index]= value;
    setCode(newCode);
    if(value && index <5){
      inputRefs.current[index+1].focus()
    }
   }

  }
function handleKeyDown(index,e){
  //!code[index] only if there is a falsy value such as a "" null NaN undefined that this will be true
  // so !falsy = true
  if(e.key ==='Backspace' && !code[index] && index >0){
    inputRefs.current[index-1].focus()
  }
}
async function handleSubmit(e){
  e.preventDefault()
const newCode = code.join("")

// console.log(newCode)
    const response = await verifyUser(newCode);
    console.log(response)

    if(response?.success){
      toast.success('Successfully Validated User!')
      nav('/dashboard')
     
    }
    if(!response){
      toast.error('Invalid verification code!')
     
    }
    
  
  
  
}
useEffect(()=>{
if(code.every(item=>item!=='')){
  handleSubmit(new Event('submit'))
}
},[code])
  return (
    <div className='verification-wrapper'>
          <h2>Enter Your Verification Code</h2>
      <form className='verification-form' onSubmit={()=>handleSubmit()}>
        
        {code.map((item,index)=>{
       return   <input
            key={index}
            ref={el=> inputRefs.current[index]=el}
            type='text'
            maxLength={6}
            value={item}
            onChange={(e)=>handleChange(index,e.target.value)}
            onKeyDown={(e)=>handleKeyDown(index,e)} 
            className='verification-form-input'         
          />
        })}
      </form>

    </div>
  )
}
