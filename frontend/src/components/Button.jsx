import {useState} from 'react'
import './Custom_Components.css';
export default function Button({icon:Icon,name,...props}) {
  return (
    <div className='button-wrapper'> 
      <div className="icon-wrapper">
      
        <button {...props}><Icon className='lucide-icon'/>{name}</button>
        </div>
    </div>
    
  )
}
