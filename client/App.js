import React, { useState } from 'react';
import Category from './components/Category.js';
import Task from './components/Task.js';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 'task1', description: 'Task 1 content', category: 'none' },
  ]);
  const [taskDetails, setTaskDetails] = useState();

  //add useEffect to handle fetching tasks from server

  const handleAddTask = () => {
    setTasks((prevTasks) => [...prevTasks, { description: taskDetails }]);
    setTaskDetails('');
  };
  const handleDrop = (taskID) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskID ? { ...task, category: '1' } : task))
    );
    console.log('Task now moved to category:', taskID);
    console.log('Updated tasks:', tasks);
  };

  return (
    <div className='app'>
      <h1> it works </h1>
      <div className='unassigned-tasks'>
        {tasks
          .filter((task) => task.category === 'none')
          .map((task) => {
            console.log(task);
            return (
              <div key={task.id}>
                <Task id={task.id} content={task.description} />
              </div>
            );
          })}
      </div>
      <Category onDrop={handleDrop} tasks={tasks.filter((task) => task.category === '1')} />
    </div>
  );
}
