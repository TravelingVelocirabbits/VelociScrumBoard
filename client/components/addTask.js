import React, { useState } from 'react';
import { api } from '../utils/api';

export default function AddTask() {
  const [taskData, setTaskData] = useState({
    Task_Name: '',
    Assignee: [],
    Due_Date: null,
    Priority: '',
    Status: '',
    Description: '',
    Category: '',
  });

  const handleSubmit = async () => {
    try {
      const data = await api.createTask(taskData);
      console.log(data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <input
        value={taskData.Task_Name}
        onChange={(e) => setTaskData({ ...taskData, Task_Name: e.target.value })}
        placeholder='Task Name'
      />

      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}
