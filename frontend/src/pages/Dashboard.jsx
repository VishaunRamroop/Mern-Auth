import {useState,useEffect} from 'react';
import useAuth from '../contexts/Auth_Context';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const {user} = useAuth();


   const {_id,name,email,lastLogin,isVerified,isAuthenticated}= user;
 // had to convert it into a date object
 const date = new Date(lastLogin);



  return (
    <div className='user-info-container'>
    

            <table className="user-info-wrapper">
             <tbody>
             <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>last login</th>
              </tr>
             </tbody>
             <tbody>
             <tr>
                <td>{_id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{date.toLocaleDateString('en-US')}</td>
              
              </tr>
             </tbody>
            </table>
  


    </div>
  )
}
