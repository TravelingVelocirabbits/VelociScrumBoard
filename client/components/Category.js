// import React, {Component} from 'react';
import React, {useState} from 'react';
import Task from './Task.js';
const Category = () => {
  const [tasks, setTasks] = useState([]);
  
  const dropHandler = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text/plain");
     Task.handleDrop(taskId, taskId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  

  return(
  <div onDrop={dropHandler} onDragOver={handleDragOver}>
  </div>
  
  )
};

export default Category;


