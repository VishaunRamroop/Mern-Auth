import { useState,useEffect } from 'react'
import { Route,Routes,Navigate, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css'
import useAuth from './contexts/Auth_Context';
import {Toaster} from 'react-hot-toast';
import EmailVerification from './pages/EmailVerification';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import NavBar from './components/NavBar'
const RedirectUser=({children})=> {
   
  const {isAuthenticated,user,checkingAuth}= useAuth();



  if(!isAuthenticated && !user?.isVerifieSd){
    return <Navigate to={'/login'} replace/>
  }

  return children
}
const RedirectAuthenticated=({children})=>{
  const {isAuthenticated}= useAuth();

  if( isAuthenticated ){
    return <Navigate to={'/dashboard'} replace/>
  }
  return children
}

function App() {
  const {isAuthenticated,user,checkingAuth,checkAuth}= useAuth();


  useEffect(() => {
    if (checkingAuth) {
      checkAuth();
    }
  }, [checkingAuth, checkAuth]);
  return (
 <div className="app">
  <NavBar/>
  <Routes>
  
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element= {<RedirectAuthenticated>
      <Login/>
    </RedirectAuthenticated>}/>
    <Route path='/verify' element={<EmailVerification/>}/>
   
    <Route path='/dashboard' element={ 
<RedirectUser>  <Dashboard/></RedirectUser>
}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/reset-password/:token' element={<ResetPassword/>}/>
 
  </Routes>
  <Toaster/>
 </div>
  )
}

export default App
