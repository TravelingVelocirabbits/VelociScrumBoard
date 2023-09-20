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

  if (source.droppableId === 'usersCategory') {
    console.log('all users: ', users);
    const copiedUsers = [...users];
    console.log(copiedUsers);
    const [removed] = copiedUsers.splice(source.index, 1);
    copiedUsers.splice(destination.index, 0, removed);

    setUsers(copiedUsers);
  } else if (source.droppableId === destination.droppableId) {
    // Reordering tasks within the same category
    const category = categories[source.droppableId];
    console.log(category);
    console.log(categories);
    console.log(categories[source.droppableId]);
    const copiedItems = [...category.items];
    console.log([...category.items]);
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
    console.log(source);
    console.log(destination);
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
    const newCats = Object.assign({}, categories);

    async function updateCatTask() {
      const tasks = await api.getTask();
      const categories = await api.getCategory();
      for (let i = 0; i < categories.length; i++) {
        const _id = categories[i]._id;
        const name = categories[i].category;
        const catTasks = tasks.filter((el) => el.Category === name);
        newCats[_id] = {
          name: name,
          items: catTasks,
        };
      }
      setCategories(newCats);
    }
    updateCatTask();

    setUsers(users);
  }, [users, effect]);

  const addNewCategory = () => {
    const category = api.createCategory({ category: 'New Category' });
    const { _id } = category;

    setCategories({
      ...categories,
      [_id]: {
        name: 'New Category',
        items: [],
      },
    });
  };

  const addNewTask = async (categoryId, task) => {
    if (!task) {
      const { _id } = categoryId;
      const category = categories[_id];
      await api.createTask({ Task_Name: ' ', Category: category.name });

      return;
    }
    const category = categories[categoryId];
    const newItems = [...category.items, task];
    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };

  const addNewUser = (user) => {
    setUsers((users) => {
      const updatedUsers = [...users, user];
      // console.log('New user list:', updatedUsers);
      return updatedUsers;
    });
  };

  const removeTask = (categoryId, removeTask) => {
    setEffect([]);
  };

  const removeUser = async (userId) => {
    console.log(userId);
    await api.removeUser(userId);
    setEffect([]);
  };

  const editTask = (categoryId, edittedTask) => {
    const category = categories[categoryId];
    const newItems = edittedTask;
    console.log(
      'The category id in the editTask definitition is App.js is: ',
      categoryId
    );

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
            addNewUser={addNewUser}
            removeUser={removeUser}
          />
          {Object.entries(categories).map(([id, category]) => (
            <Category
              key={id}
              categoryId={id}
              category={category}
              addNewTask={addNewTask}
              removeTask={removeTask}
              editTask={editTask}
            />
          ))}
          <div className="add-category-container">
            <button
              onClick={addNewCategory}
              className="add-category-button"
            >
              {' '}
              + New Section
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
