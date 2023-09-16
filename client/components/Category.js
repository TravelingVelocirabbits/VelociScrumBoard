// import React, {Component} from 'react';
import React from 'react';
import Task from './Task.js';

const Category = ({ onDrop, tasks }) => {
  const dropHandler = (event) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    onDrop(taskId);
    console.log('Dropped task with ID:', taskId, 'to category');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    console.log('Dragging over category');
  };

  return (
    <div>
      <div className='category' onDrop={dropHandler} onDragOver={handleDragOver}>
        {tasks.map((task) => {
          console.log(task);
          return <Task key={task.id} content={task.description} />;
        })}
      </div>
    </div>
  );
};

export default Category;
