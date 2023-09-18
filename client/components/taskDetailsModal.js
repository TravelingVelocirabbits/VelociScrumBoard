import React from 'react';

export default function TaskDetailsModal({ isOpen, onClose, task }) {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Task Details</h2>
        <div>
          <strong>Task Name:</strong> {task.Task_Name}
        </div>
        <div>
          <strong>Assignee:</strong> {task.Assignee.join(', ')}
        </div>
        <div>
          <strong>Due Date:</strong> {task.Due_Date}
        </div>
        <div>
          <strong>Priority:</strong> {task.Priority}
        </div>
        <div>
          <strong>Status:</strong> {task.Status}
        </div>
        <div>
          <strong>Description:</strong> {task.Description}
        </div>
        <div>
          <strong>Category:</strong> {task.Category}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
