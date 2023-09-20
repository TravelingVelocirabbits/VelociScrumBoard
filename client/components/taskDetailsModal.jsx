import React from 'react';
//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;

  function makeEditable(element) {
    // const text = element.textContent;
    // const input = document.createElement('input');
    // input.type = 'text';
    // input.value = text;
    
    // input.addEventListener('blur', function () {
    //   const newText = input.value;
    //   element.textContent = newText;
    //   element.removeChild(input);
    // });

    // element.textContent = '';
    // element.appendChild(input);
    // input.focus();
  }


  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='taskPopup'>
          <h2>{task.Task_Name}</h2>


          <button className='taskPopupButton'  onClick={() => editTask(
            task._id,
            // { Task_Name:'',
            //   Assignee:'',
            //   Due_Date:'',
            //   Priority:'',
            //   Status:'',
            //   Description:'',
            //   Category:'',}
          )}>Edit</button>
        </div>
        
        <div className='popContent'>
            <label htmlFor="updateTaskInfo">Update Take Info</label>
            <div className="editable" id="editableText" onClick={makeEditable(this)}>
            Click here to edit this text.
            </div>
          {/* <strong>Assignee: <span className='content'>{task.Assignee.join(', ')}</span></strong>
          <strong>Due Date: <span className='content'>{task.Due_Date}</span></strong>
          <strong>Priority: <span className='content'>{task.Priority}</span></strong> 
          <strong>Status: <span className='content'>{task.Status}</span></strong>
          <strong>Description: <span className='content'>{task.Description}</span></strong>
          <strong>Category: <span className='content'>{task.Category}</span></strong>  */}
        </div>
        <button className='popCloseButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
