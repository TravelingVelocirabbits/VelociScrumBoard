import React from 'react';

const Task = ({ id, content }) => {
  const dragStartHandler = (event) => {
    event.dataTransfer.setData('text/plain', id);
    console.log('Dragging', content);
  };

  return (
    <div className='task' draggable onDragStart={dragStartHandler}>
      {content} (ID: {id})
    </div>
  );
};

export default Task;
