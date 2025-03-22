import {useState} from 'react';
import useAuth from '../contexts/Auth_Context';
import {Link,useNavigate} from 'react-router-dom';
export default function NavBar() {
  const {isAuthenticated,user,logout}= useAuth();
  const nav= useNavigate();
  async function handleLogout(){
    await logout();
    nav('/login')
  }
  return (
    <nav>
      
      {isAuthenticated && user.isVerified? <>
        <Link className='btn logout' onClick={()=>{handleLogout()}}>Logout</Link></>:<Link to={'/login'}>Home</Link>}
    </nav>
  )
}
