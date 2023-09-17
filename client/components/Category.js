import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

export default function Category({ category, categoryId, addNewTask }) {
  return (
    <div>
      <Droppable droppableId={categoryId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              padding: 4,
              width: 250,
              minHeight: 500,
            }}
          >
            {category.items.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button onClick={() => addNewTask(categoryId)}>Add New Task</button>
    </div>
  );
}
