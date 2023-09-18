import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './components/Category';
import Users from './components/Users';

const initialCategories = {
  [uuidv4()]: {
    name: 'Todo',
    items: [],
  },
};

const initialUsers = [];

const onDragEnd = (result, categories, setCategories, users, setUsers) => {
  const { source, destination } = result;

  // Checks if item was dropped outside of the droppable environment
  if (!destination) return;

  if (source.droppableId === 'usersCategory') {
    console.log(source);
    console.log(destination);

    const copiedUsers = [...users];
    const [removed] = copiedUsers.splice(source.index, 1);
    copiedUsers.splice(destination.index, 0, removed);

    setUsers(...copiedUsers);
  }

  if (source.droppableId === destination.droppableId) {
    // Reordering tasks within the same category
    const category = categories[source.droppableId];
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

export default function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [users, setUsers] = useState(initialUsers);

  const addNewCategory = () => {
    const newId = uuidv4();
    setCategories({
      ...categories,
      [newId]: {
        name: 'New Category',
        items: [],
      },
    });
  };

  const addNewTask = (categoryId, task) => {
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
    setUsers([...users, user]);
  };

  return (
    <div className='app'>
      <button onClick={addNewCategory}>Add New Category</button>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, categories, setCategories)}>
        <div className='categories-container'>
          <Users userId={'usersCategory'} users={users} addNewUser={addNewUser} />
          {Object.entries(categories).map(([id, category]) => (
            <Category key={id} categoryId={id} category={category} addNewTask={addNewTask} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
