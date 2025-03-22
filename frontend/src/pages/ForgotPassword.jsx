import React from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import useAuth from '../contexts/Auth_Context';
import {Mail,Send} from 'lucide-react';
import toast from 'react-hot-toast';
import './ForgotPassword.css'
export default function ForgotPassword() {

  const {forgotPassword,email,setEmail,error}= useAuth();
  async function handleForgotPassword(e) {
    e.preventDefault()
    try {
    
      await forgotPassword(email.toLowerCase());
      toast.success('If email exists, Instructions were sent on how to reset your password.')
      console.log(error)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='forgot-password-wrapper'>
      <form action="" className='forgot-password-form' onSubmit={handleForgotPassword}>
        <Input icon={Mail} value={email} onChange={(e)=>{setEmail(e.target.value)}} type= 'email' placeholder= 'Enter your email.'/>
        <Button className='btn forgot' icon={Send} name={'Send Instructions'} />
      </form>

    </div>
  )
}
