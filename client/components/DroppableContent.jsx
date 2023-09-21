import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskDetailsModal from './taskDetailsModal';

const DroppableContent = ({
  categoryId,
  type,
  categoryItems,
  formatDueDate,
  onTaskClick,
  onTaskRemove,
  handleTaskEdit,
  selectedTask,
  setSelectedTask,
}) => {
  return (
    <Droppable
      droppableId={String(categoryId)}
      key={categoryId}
      type={type}
    >
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            background: snapshot.isDraggingOver ? '#ffffff' : '#ffffff',
            padding: 4,
            width: 250,
            minHeight: 500,
            backgroundColor: '#FFFFF',
            borderRadius: '10px',
            border: '1px solid #ccc',
          }}
          className="columnShadow"
        >
          {categoryItems.map((task, index) => (
            <Task
              key={task._id}
              task={{ ...task, Due_Date: formatDueDate(task.Due_Date) }}
              index={index}
              onTaskClick={onTaskClick}
              onTaskRemove={onTaskRemove}
            />
          ))}
          {provided.placeholder}
          <TaskDetailsModal
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            task={selectedTask}
            editTask={handleTaskEdit}
          />
        </div>
      )}
    </Droppable>
  );
};

export default DroppableContent;
