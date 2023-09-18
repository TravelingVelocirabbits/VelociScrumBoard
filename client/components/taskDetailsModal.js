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