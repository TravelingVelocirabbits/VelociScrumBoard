import React, { useState, useRef, useEffect } from 'react';
import Category from './components/Category.js';
import Task from './components/Task.js';

export default function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const testCategory = [
    {
      key: 'Category 1',
      name: 'Category 1',
      tasks: [],
    },
  ];
  const testTasks = [
    {
      id: 1,
      Task_Name: 'Task 1',
      Description: 'This is Task 1',
    },
    {
      id: 2,
      Task_Name: 'Task 2',
      Description: 'This is Task 2',
    },
  ];

  const [categories, setCategories] = useState(testCategory);
  const [tasks, setTasks] = useState(testTasks);

  //add useEffect to handle fetching tasks from server
  useEffect(() => {}, []);

  const dragStart = (e, position, category) => {
    dragItem.current = { position, category };
  };

  const dragEnter = (e, position, category) => {
    dragItem.current = { position, category };
  };

  const drop = (e) => {
    const copyTasks = [...tasks];
    const draggedTask = copyTasks[dragItem.current];
    copyTasks.splice(dragItem.current, 1);
    copyTasks.splice(dragOverItem.current, 0, draggedTask);
    dragItem.current = null;
    dragOverItem.current = null;
    setTasks(copyTasks);
  };

  const handleAddTask = (category = 'Unassigned') => {
    const newTask = {
      Task_Name: '',
      Assignee: [],
      Due_Date: null,
      Priority: '',
      Status: '',
      Description: '',
      Category: category,
    };
    const updatedTasks = { ...tasks };
    if (!updatedTasks[category]) {
      updatedTasks[category] = [];
    }
    updatedTasks[category].push(newTask);
    setTasks(updatedTasks);
  };
  return (
    <div className='app'>
      <button onClick={handleAddTask}>Add Task</button>
      {categories.map((category) => (
        <Category
          key={category}
          name={category}
          tasks={tasks[category]}
          dragStart={dragStart}
          dragEnter={dragEnter}
          drop={drop}
          handleAddTask={handleAddTask}
        />
      ))}
    </div>
  );
}
