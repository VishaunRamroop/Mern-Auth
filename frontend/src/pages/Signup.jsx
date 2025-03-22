import {useState} from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import {User,Mail,Lock,Send,Eye} from 'lucide-react'
import { Link } from 'react-router-dom';
import useAuth from '../contexts/Auth_Context';
import PasswordChecker from '../components/PasswordChecker';
import { useNavigate } from 'react-router-dom';

import './Signup.css'
export default function Signup() {
  const{signup,name,setName,email,setEmail,password,setPassword,error,strength}= useAuth();
  const nav = useNavigate();
  const [toggle,setToggle]= useState(false)
  async function handleSignUp(e) {
    e.preventDefault()
    await signup(name,email,password);
    nav('/verify')
    setName('')
    setEmail('')
    setPassword('')

  }
  return (
    <div className='signup-wrapper'>
      <form className='signup-form' onSubmit={handleSignUp}>
        <Input value={name} onChange={(e)=>setName(e.target.value)} icon={User} type= {'text'} placeholder='Enter Your Name'/>
        <Input value={email} onChange={(e)=>setEmail(e.target.value)} icon={Mail} type={'email'} placeholder='Enter Your Email'/>
       <label className='password-wrapper' > <Input value={password} onChange={(e)=>setPassword(e.target.value)} icon={Lock}  type={toggle?'text':'password'} placeholder='Enter Your Password' 
        /><Eye className='eye-signup'onClick={()=>setToggle(!toggle)}/> </label>
         <PasswordChecker password={password }/>
        <Button icon={Send} name={'Signup'} disabled={strength <4} className={'btn signup'}/>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
       
      </form>
   

    </div>
  )
}
