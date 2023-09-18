import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function User({ user, index }) {
  return (
    <Draggable draggableId={String(user._id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            userSelect: 'none',
            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            color: 'white',
            ...provided.draggableProps.style,
          }}
          className='taskDisplay'
        >
          <div className='taskContent'>
            {user.name}
          </div>
  
        </div>
      )}
    </Draggable>
  );
}
