import e from 'cors';
import React, { useState, useEffect } from 'react';
import { Value } from 'sass';

const dbURI = 'http://localhost:3000/route';

//FORM FOR SUBMITTING CREATING A TASK
export default function TaskModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const [editedTask, setEditedTask] = useState({});
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Populate Categories dropdown
    fetch(`${dbURI}/category`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCategories(data.map((el) => el.category)));

    // Populate Assignees Dropdown
    fetch(`${dbURI}/user`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.map((el) => el.username));
      });
  }, []);

  const handleFieldChange = (field, Value) => {
    setEditedTask({
      ...editedTask,
      [field]: Value,
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    fetch(`${dbURI}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Task Created: ', data);
        onSubmit(editedTask);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create New Task</h2>
        <form
          className="createForm"
          onSubmit={handleCreateTask}
        >
          <label>
            <input
              type="text"
              value={editedTask.Task_Name || ''}
              onChange={(e) => handleFieldChange('Task_Name', e.target.value)}
              placeholder="Task Name"
            ></input>
          </label>{' '}
          <br />
          <label>
            {/* Assignee: */}
            <select
              value={editedTask.Assignee || ''}
              onChange={(e) => handleFieldChange('Assignee', e.target.value)}
              data-placeholder="Assignee"
            >
              <option
                value=""
                disabled
              >
                Assignee
              </option>
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
            {/* Category: */}
            <select
              value={editedTask.Category || ''}
              onChange={(e) => handleFieldChange('Category', e.target.value)}
              data-placeholder="Category"
            >
              <option
                value=""
                disabled
              >
                Category
              </option>
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
            {/* Priority: */}
            <input
              type="text"
              value={editedTask.Priority || ''}
              onChange={(e) => handleFieldChange('Priority', e.target.value)}
              placeholder="Priority"
            />
          </label>
          <br />
          <label>
            {/* Due Date: */}
            <input
              type="date"
              value={editedTask.Due_Date || ''}
              onChange={(e) => handleFieldChange('Due_Date', e.target.value)}
              placeholder="Due Date"
            />
          </label>
          <br />
          <label>
            {/* Status: */}
            <input
              type="text"
              value={editedTask.Status || ''}
              onChange={(e) => handleFieldChange('Status', e.target.value)}
              placeholder="Status"
            />
          </label>
          <br />
          <label>
            {/* Description: */}
            <input
              type="text"
              value={editedTask.Description || ''}
              onChange={(e) => handleFieldChange('Description', e.target.value)}
              placeholder="Description"
            />
          </label>
          <button
            className="add-task-button"
            type="submit"
          >
            Create Task
          </button>
        </form>
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
