import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './Category';
import Users from './Users';
import { api } from '../utils/api';

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
}
await getCategory(initialCategories);

const onDragEnd = (result, categories, setCategories, users, setUsers) => {
  const { source, destination } = result;

  // Checks if item was dropped outside of the droppable environment
  if (!destination) return;

  if (
    source.droppableId !== 'usersCategory' &&
    destination.droppableId === 'usersCategory'
  )
    return;

  if (source.droppableId === 'usersCategory') {
    const copiedUsers = [...users];
    const [removed] = copiedUsers.splice(source.index, 1);
    copiedUsers.splice(destination.index, 0, removed);

    setUsers(copiedUsers);
  } else if (source.droppableId === destination.droppableId) {
    // Reordering tasks within the same category
    const category = categories[source.droppableId];
    const copiedItems = [...category.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setCategories({
      ...categories,
      [source.droppableId]: {
        ...category,
        items: copiedItems,
      },
    });
  } else {
    // Moving tasks between different categories
    const sourceCategory = categories[source.droppableId];
    const destCategory = categories[destination.droppableId];
    const sourceItems = [...sourceCategory.items];
    const destItems = [...destCategory.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setCategories({
      ...categories,
      [source.droppableId]: {
        ...sourceCategory,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destCategory,
        items: destItems,
      },
    });
  }
};

export default function Board() {
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
