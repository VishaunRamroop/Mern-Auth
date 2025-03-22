import {useState} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import {Mail,Lock,Send,Eye} from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '../contexts/Auth_Context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Login.css'
export default function Login() {
  const {login,email,setEmail,password,setPassword,error}= useAuth();
  const nav= useNavigate()
  const [toggle,setToggle]= useState(false)
  async function handleLogin(e) {
    e.preventDefault()
    console.log(email,password)
    const response = await login(email,password);
    console.log(response)
    if(response){
       setEmail('')
       setPassword('')
       setPassword('')
       nav('/dashboard')
       toast.success('Logged in successfully')
     
    } 
    if(!response){
      toast.error('Invalid Credentials')
    }
    
  }
  return (
    <div className='login-wrapper'>
      <form className='login-form' onSubmit={handleLogin}>
             <Input value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail} type={'email'} placeholder='Enter Your Email'/>
             <label className='password-wrapper' > <Input value={password} onChange={(e)=>setPassword(e.target.value)} icon={Lock} type={toggle? "text":"password"} placeholder='Enter Your Password'/><Eye className='eye-login'onClick={()=>setToggle(!toggle)}/> </label>
        <Button icon={Send} name={'Login'} className={'btn login'}/>
        <p>Dont have an account? <Link to='/'>Signup</Link></p>
        <p>Forgot Passowrd? <Link to='/forgot-password'>Reset Password?</Link></p>
      </form>
     
    </div>
  )
}
