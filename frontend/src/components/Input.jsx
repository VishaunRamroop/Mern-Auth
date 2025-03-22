import {useState} from 'react';
import './Custom_Components.css';
export default function Input({icon:Icon,...props}) {
  return <div className="input-wrapper">
    <div className="icon-wrapper">
        <Icon className='lucide-icon'/>
    </div>
    <input {...props}  required/>
    
  </div>
}
