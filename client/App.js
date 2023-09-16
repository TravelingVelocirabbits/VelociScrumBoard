import React, {useState} from 'react';
import Category from './components/Category.js'
// import Task from './components/Task.js'

export default function App(){
  
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState();

  //add useEffect to handle fetching tasks from server

  const handleAddTask = () => {
    setTasks(prevTasks => [...prevTasks, {description: taskDetails}]);
    setTaskDetails('');
  }
  const handleDrop = (taskID, categoryId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskID ? { ...task, category: categoryId } : task
      )
    );
  };
  
  return (
    <div className='app'>
      <h1> it works </h1>
      <Category />
    </div>
  );
}


