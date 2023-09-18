import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Category from './Category';

export default function Task({ task, index, onTaskClick, onTaskRemove }) {
  return (
    <Draggable draggableId={String(task._id)} index={index}>
      {(provided, snapshot) => (
        <div className='taskDisplay'>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              padding: 16,
              margin: '0 0 8px 0',
              minHeight: '50px',
              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
              color: 'white',
              flex: 1,
              ...provided.draggableProps.style,
            }}
            onClick={() => onTaskClick(task)}
          >
            {task.Task_Name}
          </div><div>
            <button
              className="taskButton"
              onClick={() => onTaskRemove(task._id)}
            >Delete</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}