import React, { useState, useEffect } from 'react';

const dbURI = 'http://localhost:3000/route';

//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;
  const [editedTask, setEditedTask] = useState({});
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // Hook for opening the edit task modal
  useEffect(() => {
    if (isOpen && task) {
      setEditedTask(task);
    }
  }, [isOpen, task]);

  // Hook for populating the Set Category DropDown
  useEffect(() => {
    fetch(`${dbURI}/category`)
      .then((res) => res.json())
      .then((data) => {
        setCategories((prevCategories) => {
          return data.map((el) => el.category).concat(prevCategories);
        });
      });
  }, []);

  // Hook for populating the Set Assignee DropDown
  useEffect(() => {
    fetch(`${dbURI}/user`)
      .then((res) => res.json())
      .then((data) => {
        setUsers((prevUsers) => {
          return data.map((el) => el.username).concat(prevUsers);
        });
      });
  }, []);

  const handleFieldChange = (field, value) => {
    setEditedTask({
      ...editedTask,
      [field]: value,
    });
  };

  const handleSaveEdit = () => {
    editTask(editedTask);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="taskPopup">
          <h2>{task.Task_Name}</h2>
        </div>

        <div className="popContent">
          <form className="createForm">
            <label>
              <input
                type="text"
                value={editedTask.Task_Name || ''}
                placeholder={'Enter Task Name'}
                onChange={(e) => handleFieldChange('Task_Name', e.target.value)}
              />
            </label>
            <br />

            <label>
              <select
                value={editedTask.Assignee || ''}
                onChange={(e) => handleFieldChange('Assignee', e.target.value)}
              >
                {users.map((user, index) => (
                  <option
                    key={index}
                    value={user}
                  >
                    {user}
                  </option>
                ))}
              </select>
            </label>
            <br />

            <label>
              <select
                value={editedTask.Category || ''}
                onChange={(e) => handleFieldChange('Category', e.target.value)}
              >
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <input
                type="text"
                value={editedTask.Priority || ''}
                placeholder={editedTask.Priority || 'Priority'}
                onChange={(e) => handleFieldChange('Priority', e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="date"
                value={editedTask.Due_Date || ''}
                onChange={(e) => handleFieldChange('Due_Date', e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                value={editedTask.Status || ''}
                placeholder={editedTask.Status || 'Status'}
                onChange={(e) => handleFieldChange('Status', e.target.value)}
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                value={editedTask.Description || ''}
                placeholder={editedTask.Description || 'Description'}
                onChange={(e) =>
                  handleFieldChange('Description', e.target.value)
                }
              />
            </label>
          </form>
        </div>
        <button
          className="add-task-button"
          onClick={handleSaveEdit}
        >
          Save Edit
        </button>
        <button
          className="add-task-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
