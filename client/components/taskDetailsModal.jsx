import React, { useState, useEffect } from "react";

//POPUP OF TASK ON CLICK OF TASK
export default function TaskDetailsModal({ isOpen, onClose, task, editTask }) {
  if (!isOpen) return null;
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    if (isOpen && task) {
      setEditedTask(task);
    }
  }, [isOpen, task]);

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
          <button
            className="taskPopupButton"
            onClick={handleSaveEdit}
          >
            Save Edit
          </button>
        </div>

        <div className="popContent">
          <form>
            <label>
              Assignee:
              <input
                type="text"
                value={(editedTask.Assignee || []).join(", ")}
                onChange={(e) =>
                  handleFieldChange("Assignee", e.target.value.split(", "))
                }
              />
            </label>

            <label>
              Category:
              <input
                type="text"
                value={editedTask.Category || ""}
                onChange={(e) => handleFieldChange("Category", e.target.value)}
              />
            </label>
            <label>
              Priority:
              <input
                type="text"
                value={editedTask.Priority || ""}
                onChange={(e) => handleFieldChange("Priority", e.target.value)}
              />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                value={editedTask.Due_Date || ""}
                onChange={(e) => handleFieldChange("Priority", e.target.value)}
              />
            </label>

            <label>
              Status:
              <input
                type="text"
                value={editedTask.Status || ""}
                onChange={(e) => handleFieldChange("Status", e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={editedTask.Description || ""}
                onChange={(e) =>
                  handleFieldChange("Description", e.target.value)
                }
              />
            </label>
          </form>
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
