import React from 'react';
//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='taskPopup'>
          <h2>{task.Task_Name}</h2>
          <button className='taskPopupButton'  onClick={() => editTask(task.Task_Name)}>Edit</button>
        </div>
        
        <div className='popContent'>
          <strong>Assignee:</strong> {task.Assignee.join(', ')}
          <strong>Due Date:</strong> {task.Due_Date}
          <strong>Priority:</strong> {task.Priority}
          <strong>Status:</strong> {task.Status}
          <strong>Description:</strong> {task.Description}
          <strong>Category:</strong> {task.Category}
        </div>
        <button className='popCloseButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
