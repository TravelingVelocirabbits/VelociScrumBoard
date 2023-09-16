import React from 'react';

const Task = ({ id, content, handleDrop }) => {
  const dragStartHandler = (event) => {
    event.dataTransfer.setData("text/plain", id);
  };

  return (
    <div className="task" draggable onDragStart={dragStartHandler}>
      {content}
    </div>
  );
};

export default Task;