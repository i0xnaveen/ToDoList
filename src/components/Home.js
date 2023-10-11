import React from 'react'
import { useState ,useEffect} from 'react';
import './Home.css'
import axios from 'axios';

function Home() {
  


  const [task,setTask]=useState('');
  const [taskslist,setTaskList]=useState([ ]);
  const fetchTasks = async () => {
    try {
      const response = await axios.post('http://localhost:3001/ret-tasks');
      const taskData = await response.data;
      setTaskList(taskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();},[task]); 
  const handleRemove=async(task_id)=>{
     try{
      const res=await axios.delete('http://localhost:3001/delete-task/${task_id}');
      if(res.status===200){
         fetchTasks();
      console.log("deleted successfully")
     }}
     catch(error){
      console.log(error);
     }
    

  };
  const handleSubmit=async(e)=>{
    if(task!=''){
      const res=await axios.post('http://localhost:3001/add-tasks',{task});
      if(res.status===200){
        setTask('');
console.log("Added Successfully")
      }
    }
    else{
      alert("Something phishing")
    }
    
  }
 
  return (
     <div className='todo-container'>
      <div className='inside-side'>
      <div>
        <h1 className='todo-title'>To-do List</h1>
      </div>
         <div className='class-home-input'> 
        <input  className="home-input" type='text' placeholder='' onChange={(e)=>setTask(e.target.value)}/>
        <button className="btn-add" onClick={handleSubmit}><span className='span-add'>+</span></button>
        </div>
        
        <div id='todolist'>
        <ul id='todolist'>
    {taskslist.map((taskObj) => (
    <p  className="task-name" 
    key={taskObj._id}>{taskObj.Tasks}<span onClick={handleRemove(taskObj._id)} class="material-symbols-outlined">
    delete
    </span></p>
  ))}
</ul>

        
                 </div>
    </div>
       
   
      </div>



   
    
  )
}

export default Home