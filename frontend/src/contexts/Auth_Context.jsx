import { useContext,createContext,useState, Children } from "react";
import {toast} from 'react-hot-toast';
import axios from 'axios';
const AuthContext= createContext();




export function AuthProvider({children}){
  const baseURL= `http://localhost:3000/api/auth`;
  axios.defaults.withCredentials= true;
  const [isAuthenticated,setIsAuthenticated]= useState(false)
  const [loading,setLoading]= useState(false);
  const [error,setError] = useState({});
  const [user,setUser]=useState({});
  const [checkingAuth,setCheckingAuth]= useState(true);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [message,setMessage]= useState({});
  const [strength,setStrength]= useState(1)
  console.log("Auth Context - isAuthenticated:", isAuthenticated);
  console.log("Auth Context - user:", user);
  console.log("Auth Context - checkingAuth:", checkingAuth);
async function signup(name,email,password) {
  try {
    setLoading(true)
    const {data}= await axios.post(`${baseURL}/signup`,{name,email,password});
    if(data){
      setLoading(false);
      console.log(data)
      setUser(data.user)
      toast.success(data.message)
    }
  } catch (error) {
    console.error(error);
    setError(error)
  }
};
async function verifyUser(token){

  try {
    setLoading(true);
    const {data}= await axios.post(`${baseURL}/verify-email`,{token});
    if(data){
      setLoading(false);
      setUser(data.user);
      setIsAuthenticated(true);
     console.log(data)
    }
    return data;
  } catch (error) {
    setError(error);
    setLoading(false);
    setIsAuthenticated(false);
    console.error(error);
  }
}

async function checkAuth() {
  setLoading(true);
  try {
   
    const {data} = await axios(`${baseURL}/check-auth`);
  
   if(data){
    setIsAuthenticated(true);
    setUser(data.user);
   }
     
  } catch (error) {
    setError(error);
    setIsAuthenticated(false);
    setUser(null)
    setCheckingAuth(false);
    // console.error(error);
  }finally{
    setLoading(false);
    setCheckingAuth(false);
  }
}

async function login(email,password) {
  try {
    setCheckingAuth(true)
    setLoading(true);
    const {data}= await axios.post(`${baseURL}/login`,{email,password});

    if(data){
      setLoading(false)
      setCheckingAuth(false);
      setIsAuthenticated(true)
      setUser(data.user)
 
    }
    return data
  } catch (error) {
    setError(error);
    setCheckingAuth(false);
    setIsAuthenticated(false);
    console.error(error);
  }finally{
    setCheckingAuth(false)
    setLoading(false)
  }
}
async function logout() {
  try {
    setLoading(true);
    setCheckingAuth(false);
    setIsAuthenticated(false);
    const {data}= await axios.get(`${baseURL}/logout`);
   if(data){
    setUser(null)
    setLoading(false)
   }
  } catch (error) {
    setError(error);
    setUser(null)
    setCheckingAuth(false)
    setIsAuthenticated(false);
    console.error(error);
  }finally{
    setCheckingAuth(false)
  }
}
async function forgotPassword(email){
  try {
    setLoading(true)
    const {data}= await axios.post(`${baseURL}/forgot-password`,{email});
    console.log(data)
    if(data){
      setLoading(false)
      setError(data)
 
    }
    

  } catch (error) {
    setError(error)
    console.log(error)
    setIsAuthenticated(false)
  }
}
async function resetPassword(token,password){
  setLoading(true)
  console.log(token)
  console.log(password)
  try {
    const {data} = await axios.post(`${baseURL}/reset-password/${token}`,{password})
    if(data){
      return data;
    }
 
  } catch (error) {
    setError(error);
    console.error(error);
  }finally{
    // setError(error.response.data);
    setIsAuthenticated(false);
    setLoading(false)
    setCheckingAuth(false);
    
  }
}
let values={ error,setError,message,user,checkingAuth,checkAuth,setCheckingAuth, isAuthenticated,signup,name,setName,email,setEmail,password,setPassword,verifyUser,login,logout,forgotPassword,resetPassword,strength,setStrength}
  return <AuthContext.Provider value={values}>
    {children}
  </AuthContext.Provider>
}


export default function useAuth(){

  return useContext(AuthContext)
}