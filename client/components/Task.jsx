import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Category from './Category';
import '../stylesheets/app.css';

export default function Task({ task, index, onTaskClick, onTaskRemove }) {
  return (
    <Draggable
      draggableId={String(task._id)}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className="taskDisplay"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}

          style={task.Task_Name === ' ' ? {
            userSelect: 'none',
            ...provided.draggableProps.style,
            border: 'none',
            boxShadow: task.Task_Name === ' ' ? 'none' : '6px 6px 12px #333',
            
          } : {
            userSelect: 'none',
            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
            ...provided.draggableProps.style,
          }}

        >
          <div
            className={task.Task_Name === ' ' ? 'emptyTaskContent' : 'taskContent'}
            onClick={() => onTaskClick(task)}
            style={task.Task_Name === ' ' ? {
              height: '70px',
              width: '180px',
              backgroundColor: '#ffffff'
            } : {
            }}
            id="emptyTask"
          >
            {task.Task_Name}
          </div >
          {task.Task_Name === ' ' ? '' : 
            <button
              style={
                task.Task_Name === ' '
                  ? {
                    backgroundColor: snapshot.isDragging ? '#ffffff' : '#ffffff',
                    color: snapshot.isDragging ? '#ffffff' : '#ffffff',
                  }
                  : {}
              }
              className={`taskButton ${snapshot.isDragging ? 'dragged' : ''}`}
              onClick={() => onTaskClick(task)}
            >
              Delete
            </button>
          }
        </div>
      )}
    </Draggable>
  );
}
