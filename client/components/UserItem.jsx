import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function User({ user, index, removeUser }) {
  return (
    <Draggable draggableId={String(user._id)} index={index}>
      {(provided, snapshot) => (
        <div
          className='taskDisplay'
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            userSelect: 'none',
            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            color: 'white',
            boxShadow: snapshot.isDragging ? '6px 6px 12px #333' : '6px 6px 12px #333',
          }}
        >
          <div className='taskContent' {...provided.dragHandleProps}>{user.username}</div>
          <button
            className={`taskButton ${snapshot.isDragging ? 'dragged' : ''}`}
            onClick={() => removeUser(user._id)}
          >
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}


