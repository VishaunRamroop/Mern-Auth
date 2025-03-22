import {useState,useEffect} from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import useAuth from '../contexts/Auth_Context';
import {Send, Mail,Lock,Eye} from 'lucide-react';
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './ResetPassword.css';
import PasswordChecker from '../components/PasswordChecker.jsx';
export default function ResetPassword() {
  const {password,setPassword,resetPassword,strength,setStrength}= useAuth();
  const [confirmPassword,setConfirmPassword]= useState('');
  const [toggle,setToggle]= useState(false)
  const {token} = useParams();
  const nav =useNavigate();
  console.log(password)
  console.log(confirmPassword)
  // console.log(error.response.data.success)
 
  async function handleResetPassword(e) {
    e.preventDefault();
  
 const response =   await resetPassword(token,password);


    if(response?.success){
      toast.success(response?.message);
      nav('/login')
      setPassword('')
    }else{
      toast.error(response?.message || `Error resetting Password.`)
    };
   
  }
  console.log('strength:'+strength)
  return (
    <div className='reset-password-wrapper'>
      <form onSubmit={handleResetPassword} className='reset-password-form'>
      <label className='password-wrapper' >  <Input icon={Lock} value={password} onChange={(e)=>{setPassword(e.target.value)}}  className= 'reset-password' type={toggle?'text':'password'} placeholder='Enter New Password'/><Eye className='eye-reset'onClick={()=>setToggle(!toggle)}/> </label>
        <label className='password-wrapper' >  <Input icon={Lock} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} className= 'reset-password' type={toggle?'text':'password'}placeholder='Confirm New Password'/><Eye className='eye-reset'onClick={()=>setToggle(!toggle)}/> </label>
        {password !==confirmPassword? <p style={{color:'red'}}>Passwords do not Match</p>:null}
        <PasswordChecker password={password }/>
        <Button  disabled={strength <4 || password !==confirmPassword} icon={Send} name={'reset'} className={'btn reset'}/>
      </form>
    </div>
  )
}
