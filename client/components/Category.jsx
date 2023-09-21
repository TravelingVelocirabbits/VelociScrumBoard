import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModal from './taskModal';
import TaskDetailsModal from './taskDetailsModal';
import { api } from '../utils/api';

export default function Category({
  category,
  categoryId,
  addNewTask,
  reRender,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // TITLE EDITS =========================================
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(category.title); // Initialize with the existing title


  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      // Update the category title on Enter key press
      // You may want to add logic to save the edited title to the backend here
      // For now, we'll update it locally in the state
      setIsEditing(false);
      await api.editCategory({ category: category.name, newCat: editedTitle });
      //edit tasks to change to new category
      
      reRender();
    }
  };

  const handleTitleRemove = async () => {
    await api.removeCategory({ category: category.name });
  
    for (let i = 0; i < category.items.length; i++){
      await api.removeTask({Category: category.name});
    }
    reRender(); 
  };
  // TITLE EDITS =========================================

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const formatDueDate = (date) => {
    if (!date) return '';

    const dueDate = new Date(date);
    const month = dueDate.getMonth() + 1;
    const day = dueDate.getDate();
    const year = dueDate.getFullYear();

    return `${month}-${day}-${year}`;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {};
    formData.forEach((value, key) => {
      taskData[key] = value;
    });

    // Send the taskData to the backend:
    const newTask = await api.createTask(taskData);

    if (newTask) {
      addNewTask(categoryId, newTask);
      handleCloseModal();
    }
  };

  const handleTaskRemove = async (taskData) => {
    const removedTask = await api.removeTask({ _id: taskData });
    if (removedTask) {
      handleCloseModal();
      reRender();
    }
  };

  const handleTaskEdit = async (taskData) => {
    const edittedTask = await api.editTask(taskData);
    if (edittedTask) {
      reRender();
    }
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          onKeyPress={handleTitleKeyPress}
          onBlur={() => setIsEditing(false)}
          className="category-inputTitle center-title-vertically"
        />
      ) : (
        <h2
          className="category-title center-title-vertically"
          onClick={handleTitleClick}
        >
          <span className="titleMargin">{category.name}</span>
          <button
            className="titleButton"
            onClick={handleTitleRemove}
          >
            Delete
          </button>
        </h2>
      )}
      <Droppable
        droppableId={String(categoryId)}
        key={categoryId}
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? '#d9d9d9' : '#ffffff',
              padding: 4,
              width: 250,
              minHeight: 500,
              backgroundColor: '#FFFFF',
              borderRadius: '10px',
              border: '1px solid #ccc',
            }}
            className="columnShadow"
          >
            {category.items.map((task, index) => (
              <Task
                key={task._id}
                task={{ ...task, Due_Date: formatDueDate(task.Due_Date) }}
                index={index}
                onTaskClick={handleTaskClick}
                onTaskRemove={handleTaskRemove}
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
      <button
        onClick={handleOpenModal}
        className="add-task-button"
      >
        + Task
      </button>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
