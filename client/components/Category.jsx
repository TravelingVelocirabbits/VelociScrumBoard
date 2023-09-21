import React, { useState, useCallback, useEffect } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
// import Task from './Task';
// import TaskModal from './taskModal';
import TaskActions from './TaskActions';
// import TaskDetailsModal from './taskDetailsModal';
import DroppableContent from './DroppableContent';
import { api } from '../utils/api';

// Helper function to wrap api calls
const apiAction = async (apiCall, reRender) => {
  try {
    await apiCall();
    reRender();
  } catch (error) {
    console.error('Error: ', error);
  }
};

export default function Category({
  category,
  categoryId,
  addNewTask,
  reRender,
  type,
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  // TITLE EDITS =========================================
  // Initialize with the existing title
  const [editedTitle, setEditedTitle] = useState(category.title);
  const [isEditing, setIsEditing] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);

  const handleTitleClick = () => setIsEditing(true);
  const handleTitleChange = (e) => setEditedTitle(e.target.value);

  useEffect(() => {
    setEditedTitle(category.title);
  }, [category.title]);

  const saveEditedTitle = () => {
    apiAction(
      () => api.editCategory({ category: category.name, newCat: editedTitle }),
      reRender
    );
    setIsEditing(false);
  };

  // const removeCategoryAndTasks = async () => {
  //   await api.removeCategory({ category: category.name });
  //   await Promise.all(
  //     category.items.map(() => api.removeTask({ Category: category.name }))
  //   );
  //   reRender();
  // };

  const handleTitleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      // Update the category title on Enter key press
      // You may want to add logic to save the edited title to the backend here
      // For now, we'll update it locally in the state
      setIsEditing(false);
      await api.editCategory({ category: category.name, newCat: editedTitle });
      //edit tasks to change to new category

      for (let i = 0; i < category.items.length; i++) {
        category.items[i].Category = editedTitle;
        await api.editTask(category.items[i]);
      }
      reRender();
    }
  };

  const handleTitleRemove = async () => {
    try {
      // remove the category
      await api.removeCategory({ category: category.name });

      // Generate an array of promises to remove tasks
      const removeTasksPromises = category.items.map(() =>
        api.removeTask({ Category: category.name })
      );

      // Execute all promises in parallel
      await Promise.all(removeTasksPromises);

      // re-render
      reRender();
    } catch (error) {
      console.error('Error removing title and tasks: ', error);
    }
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

  const handleFormSubmit = async (event, type) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = {};
    formData.forEach((value, key) => {
      taskData[key] = value;
    });
    console.log(taskData);
    console.log('type is: ', type);
    taskData['Category'] = type;
    // Send the taskData to the backend:
    const newTask = await api.createTask(taskData);

    if (newTask) {
      addNewTask(categoryId, newTask);
      handleCloseModal();
    }
  };

  const handleTaskRemove = () => {
    apiAction(async () => {
      await api.removeCategory({ category: category.name });
      await Promise.all(
        category.items.map(() => api.removeTask({ category: category.name }))
      );
    }, reRender);
  };

  const handleTaskEdit = async (taskData) => {
    const editedTask = await api.editTask(taskData);
    if (editedTask) {
      reRender();
    }
  };

  return (
    <div>
      <CategoryTitle
        isEditing={isEditing}
        title={category.name}
        editedTitle={editedTitle}
        onEdit={handleTitleClick}
        onChange={handleTitleChange}
        onSave={saveEditedTitle}
        onDelete={handleTitleRemove}
      />
      <DroppableContent
        categoryId={categoryId}
        type={type}
        categoryItems={category.items}
        formatDueDate={formatDueDate}
        onTaskClick={handleTaskClick}
        onTaskRemove={handleTaskRemove}
        handleTaskEdit={handleTaskEdit}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <TaskActions
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        type={type}
        handleCloseModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
        handleTaskEdit={handleTaskEdit}
      />
    </div>
  );
}

const CategoryTitle = ({
  isEditing,
  title,
  editedTitle,
  onEdit,
  onChange,
  onSave,
  onDelete,
}) => {
  return isEditing ? (
    <input
      type="text"
      value={editedTitle}
      onChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && onSave()}
      onBlur={onSave}
      className="category-inputTitle center-title-vertically"
    />
  ) : (
    <h2
      className="category-title center-title-vertically"
      onClick={onEdit}
    >
      <span className="titleMargin">{title}</span>
      <button
        className="titleButton"
        onClick={onDelete}
      >
        Delete
      </button>
    </h2>
  );
};
