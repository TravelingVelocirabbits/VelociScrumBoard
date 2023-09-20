import React from 'react';
//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="taskPopup">
          <h2>{task.Task_Name}</h2>
          <button
            className="taskPopupButton"
            onClick={() => editTask(task.Task_Name)}
          >
            Edit
          </button>
        </div>

        <div className="popContent">
          <div contentEditable="true">
            <table>
              <tr>
                <td> Assignee:</td>
                <td>{task.Assignee.join(', ')}</td>
                <td>Due Date: </td>
                <td>{task.Due_Date}</td>
              </tr>
              <tr>
                <td>Category: </td>
                <td>{task.Category}</td>
                <td>Status: </td>
                <td>{task.Status}</td>
              </tr>
              <tr>
                <td>Priority: </td>
                <td>{task.Priority}</td>
                <td>Description:</td>
                <td>{task.Description}</td>
              </tr>
            </table>

            {/* <strong>
              <br />
              <span className="content"></span>
            </strong>
            <br />
            <strong>
              Due Date: <span className="content">{task.Due_Date}</span>
            </strong>
            <br />
            <strong>
              Priority: <span className="content">{task.Priority}</span>
            </strong>
            <br />
            <strong>
              Status: <span className="content">{task.Status}</span>
            </strong>
            <br />
            <strong>
              Description: <span className="content">{task.Description}</span>
            </strong>
            <br />
            <strong>
              Category: <span className="content">{task.Category}</span>
            </strong>
            <br /> */}
          </div>
        </div>
        <button
          className="popCloseButton"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
