import React, { useState, useEffect } from 'react';

const dbURI = 'http://localhost:3000/route/category';

//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;
  const [editedTask, setEditedTask] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen && task) {
      setEditedTask(task);
    }
  }, [isOpen, task]);

  useEffect(() => {
    fetch(dbURI)
      .then((res) => res.json())
      .then((data) => {
        setCategories((prevCategories) => {
          return data.map((el) => el.category).concat(prevCategories);
        });
      });
  }, []);

  console.log('the categories loaded in taskDetailsModal are: ', categories);
  // console.log('the 0th element in categories is: ', categories[0]);
  // console.log(
  //   'the 0th element of the 0th element in categories is: ',
  //   categories[0][0]
  // );

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
          <form className="editForm">
            <label>
              Assignee:
              <input
                type="text"
                value={(editedTask.Assignee || []).join(', ')}
                onChange={(e) =>
                  handleFieldChange('Assignee', e.target.value.split(', '))
                }
              />
            </label>
            <br />

            <label>
              Category:
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
              Priority:
              <input
                type="text"
                value={editedTask.Priority || ''}
                onChange={(e) => handleFieldChange('Priority', e.target.value)}
              />
            </label>
            <br />
            <label>
              Due Date:
              <input
                type="date"
                value={editedTask.Due_Date || ''}
                onChange={(e) => handleFieldChange('Priority', e.target.value)}
              />
            </label>
            <br />
            <label>
              Status:
              <input
                type="text"
                value={editedTask.Status || ''}
                onChange={(e) => handleFieldChange('Status', e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={editedTask.Description || ''}
                onChange={(e) =>
                  handleFieldChange('Description', e.target.value)
                }
              />
            </label>
          </form>
        </div>
        <button
          className="taskPopupButton"
          onClick={handleSaveEdit}
        >
          Save Edit
        </button>
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
