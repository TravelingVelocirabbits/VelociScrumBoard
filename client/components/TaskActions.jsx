import React from 'react';
import TaskModal from './taskModal';
import TaskDetailsModal from './taskDetailsModal';

export default function TaskActions({
  isModalOpen,
  setModalOpen,
  selectedTask,
  setSelectedTask,
  type,
  handleCloseModal,
  handleFormSubmit,
  handleTaskEdit,
}) {
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="add-task-button"
      >
        + Task
      </button>
      <TaskModal
        type={type}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
      <TaskDetailsModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        editTask={handleTaskEdit}
      />
    </>
  );
}
