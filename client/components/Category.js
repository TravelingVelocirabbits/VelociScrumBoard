import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import TaskModal from './taskModal';
import TaskDetailsModal from './taskDetailsModal';
import { api } from '../utils/api';

export default function Category({ category, categoryId, addNewTask, removeTask }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
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
    const removedTask = await api.removeTask({_id: taskData});
    if (removedTask){
      removeTask(categoryId, removedTask);
      handleCloseModal();
    }

  };

  return (
    <div>
      <Droppable droppableId={String(categoryId)} key={categoryId}>
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
              <Task key={task._id} task={task} index={index} onTaskClick={handleTaskClick} onTaskRemove={handleTaskRemove}/>
            ))}
            {provided.placeholder}
            <TaskDetailsModal
              isOpen={!!selectedTask}
              onClose={() => setSelectedTask(null)}
              task={selectedTask}
            />
          </div>
        )}
      </Droppable>
      <button onClick={handleOpenModal}>Add New Task</button>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
}
