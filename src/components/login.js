import React, { useState } from 'react'
import './login.css'
import {Link} from 'react-router-dom';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 const Login=()=> {
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
        const res=await axios.post("http://localhost:3001/login",{email,password});
        if (res.status === 200) {
          const data = await res.data; 
          console.log(res.status);
          if (data.exists) {
            navigate('/home');  
          }
          else{
            alert('Wrong email or password');
          }
        } else {
          
          console.log("Login failed. Status code:", res.status);
        }
    
    } catch (error) {
      console.log("Error occurred", error);
    }
  };
      
      
    
  return (
    <div className='login-container'>
      <div>
        <form>
          <div  className='logged'>
            <h1 className='log-titlle'> Login </h1>
          </div>  
          <div className='login-input'>
        <div className='login-em'>
            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br></br>
          
          <div className='login-pass'>
            <input type='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
          </div>
          </div>
          <div>
            <button className='login-sub' type='submit ' onClick={handleSubmit}>Sign In</button>
          </div>
          <div className='login-create'>
          <div className='login-or'>
            <p>or</p>
          </div>
         <div>
          <p className='login-cre'>create a new account <span  className='login-link'><Link to="/signup">Signup</Link></span></p>
          
         </div>
         </div>
          </form>
      </div>
    </div>
  )
}

export default Login;