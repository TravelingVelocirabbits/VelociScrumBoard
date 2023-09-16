import React from 'react';

const Task = ({ task, onDragStart, onDragEnter }) => {
  return (
    <div className='task' draggable onDragStart={onDragStart} onDragEnter={onDragEnter}>
      <h4>{task.Task_Name}</h4>
      <p>{task.Description}</p>
    </div>
  );
};

export default Task;
