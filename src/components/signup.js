import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/signup', { email, username, password });
      if (res.status === 200) {
        console.log("Login Successful");
        setEmail('');
        setUsername('');
        setPassword('');
        navigate('/');

      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error occurred", error);
    }
  };

  return (
    <div className='signup-container'>
      <div className='ins'>
        <form onSubmit={handleSubmit}>
          <div className='heading'>
            <h1>SignUp</h1>
          </div>
          <div className='em'>
            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br></br>
          <div className='us'>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <br></br>
          <div className='pass'>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button  type='submit' className='butt'>Submit</button>
          </div>
          <div className='checkbox'>
            <input type='checkbox' className='check' /><span>I have read and agree to the <a href="#">Terms of Service</a></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;
