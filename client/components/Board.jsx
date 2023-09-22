import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './Category';
import Users from './Users';
import { api } from '../utils/api';
import { onDragEnd } from './onDragEndLogic';

const initialCategories = {};
let initialUsers = [];
async function getCategory(catUpdate) {
  let categories = await api.getCategory();
  initialUsers = await api.getUser();
  const tasks = await api.getTask();

  if (categories.length === 0) {
    api.createCategory({ category: 'ToDo' });
    categories = await api.getCategory();
    for (let i = 0; i < initialUsers.length; i++) {
      await api.createTask({ Task_Name: ' ', Category: 'ToDo' });
    }
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

export default function Board() {
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState(initialUsers);
  const [effect, setEffect] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const [activeDroppableId, setActiveDroppableId] = useState(null);

  useEffect(() => {
    const newCats = {};

    async function updateCatTask(updateCat) {
      const tasks = await api.getTask();
      const categories = await api.getCategory();
      const newUsers = await api.getUser();
      for (let i = 0; i < categories.length; i++) {
        const _id = categories[i]._id;
        const name = categories[i].category;
        const catTasks = tasks.filter((el) => el.Category === name);
        let taskLength = catTasks.length;
        while(taskLength > newUsers.length){
          await api.removeTask({Category:name, Task_Name: ' '});
          taskLength--;
        }
        const newTasks = await api.getTask();
        const catTasks2 = newTasks.filter((el) => el.Category === name);
        
        updateCat[_id] = {
          name: name,
          items: catTasks2,
        };
      }
      setCategories(newCats);
      setUsers(newUsers);
    }
    updateCatTask(newCats);
  }, [effect]);

  const addNewCategory = async () => {
    //checks to see if New Category exists, if true then adds a number to the end;
    const currentCatagories = await api.getCategory();
    let count = 0;
    for (let i = 0; i < currentCatagories.length; i++) {
      const categoryCheck = currentCatagories[i].category;
      if (categoryCheck.includes('New Category')) count++;
    }
    if (count > 0)
      await api.createCategory({ category: `New Category ${count}` });
    else await api.createCategory({ category: 'New Category' });

    //create tasks with number of users in user list && set to category
    const userList = await api.getUser();
    for (let i = 0; i < userList.length; i++) {
      if (count > 0)
        await api.createTask({
          Task_Name: ' ',
          Category: `New Category ${count}`,
        });
      else await api.createTask({ Task_Name: ' ', Category: 'New Category' });
    }
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
          onDragEnd(
            result,
            categories,
            setCategories,
            users,
            setUsers,
            setActiveIndex,
            setActiveDroppableId
          )
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
              // type={category}
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
