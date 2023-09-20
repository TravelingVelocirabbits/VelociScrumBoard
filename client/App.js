import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './components/Category';
import Users from './components/Users';
import { api } from './utils/api';
import { onDragEnd } from './components/onDragEndLogic.js';

const initialCategories = {};
let initialUsers = [];
async function getCategory(catUpdate) {
  let categories = await api.getCategory();
  initialUsers = await api.getUser();
  const tasks = await api.getTask();

  if (categories.length === 0) {
    api.createCategory({ category: 'ToDo' });
    categories = await api.getCategory();
  }

  for (let i = 0; i < categories.length; i++) {
    const _id = categories[i]._id;
    const name = categories[i].category;
    const catTasks = tasks.filter((el) => el.Category === name);
    catUpdate[_id] = {
      name: name,
      items: catTasks,
    };
  }
  await getCategory(initialCategories);
}

export default function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState(initialUsers);
  const [effect, setEffect] = useState([]);

  useEffect(() => {
    console.log('USE EFFECT IS BEING TRIGGEREDDDDDDD');
    const newCats = {};

    async function updateCatTask(updateCat) {
      const tasks = await api.getTask();
      const categories = await api.getCategory();
      const newUsers = await api.getUser();
      for (let i = 0; i < categories.length; i++) {
        const _id = categories[i]._id;
        const name = categories[i].category;
        const catTasks = tasks.filter((el) => el.Category === name);
        updateCat[_id] = {
          name: name,
          items: catTasks,
        };
      }
      setCategories(newCats);
      setUsers(newUsers);
    }
    updateCatTask(newCats);
  }, [effect]);

  const addNewCategory = async () => {
    await api.createCategory({ category: 'New Category' });
    setEffect([]);
  };

  const reRender = () => {
    setEffect([]);
  };

  const addNewTask = async (categoryId, task) => {
    if (!task) {
      const { _id } = categoryId;
      const category = categories[_id];
      await api.createTask({ Task_Name: ' ', Category: category.name });
    }
    setEffect([]);
  };

  const removeUser = async (userId) => {
    await api.removeUser({ _id: userId });
    setEffect([]);
  };

  //NOT WORKED ON YET
  const editTask = (categoryId, edittedTask) => {
    const category = categories[categoryId];
    const newItems = edittedTask;

    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };

  return (
    <div className="app">
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, categories, setCategories, users, setUsers)
        }
      >
        <div className="categories-container">
          <Users
            userId={'usersCategory'}
            users={users}
            reRender={reRender}
            removeUser={removeUser}
            addNewTask={addNewTask}
          />
          {Object.entries(categories).map(([id, category]) => (
            <Category
              key={id}
              categoryId={id}
              category={category}
              addNewTask={addNewTask}
              reRender={reRender}
              editTask={editTask}
            />
          ))}
          <div className="add-category-container">
            <button
              onClick={addNewCategory}
              className="add-category-button"
            >
              + New Section
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
