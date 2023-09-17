// import React, {Component} from 'react';
import React, { useState } from 'react';
import Task from './Task.js';

const Category = ({ name, tasks, dragStart, dragEnter, drop, handleAddTask }) => {
  const [taskOrder, setTaskOrder] = useState(tasks.map((task) => task.id));

  // Permission to drop into category
  const handleDragOver = (event) => {
    event.preventDefault();
    console.log('Dragging over category');
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId.toString());
  };

  const handleDragEnter = (e, targetTaskId) => {
    e.preventDefault();
    const sourceTaskId = parseInt(e.dataTransfer.getData('text/plain'));
    if (sourceTaskId !== targetTaskId) {
      const newTaskOrder = [...taskOrder];
      const sourceIndex = taskOrder.indexOf(sourceTaskId);
      const targetIndex = taskOrder.indexOf(targetTaskId);
      newTaskOrder.splice(sourceIndex, 1);
      newTaskOrder.splice(targetIndex, 0, sourceTaskId);
      setTaskOrder(newTaskOrder);
    }
  };
  /*
    Internal Drag Event Handlers
  */
  // dragStart
  // dragEnter
  // dragDrop

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    // onDrop(taskId, taskOrder);
  };

  return (
    <div>
      <div className='category' onDrop={handleDragOver} onDragOver={handleDragOver}>
        {tasks.map((task) => {
          console.log(task);
          return (
            <Task
              key={task.id}
              content={task.description}
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragEnter={(e) => handleDragEnter(e, task.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;

/*
  Ken's idea


*/

/*
  1. Create a task (Node)
  2. Assign task an ID, and content

  Make Category a Drag Zone
  useRef 
  

  
  

*/
