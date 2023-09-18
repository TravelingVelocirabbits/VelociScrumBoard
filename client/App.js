import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './components/Category';

// const testTasks = [
//   { id: uuidv4(), content: '1st Task' },
//   { id: uuidv4(), content: '2nd Task' },
// ];

const initialCategories = {
  [uuidv4()]: {
    name: 'Todo',
    items: [],
  },
};

const onDragEnd = (result, categories, setCategories) => {
  const { source, destination } = result;

  // Dropped outside the list
  if (!destination) return;

  // Reordering tasks within the same category
  if (source.droppableId === destination.droppableId) {
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

export default function App() {
  const [categories, setCategories] = useState(initialCategories);

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

  const removeTask = (categoryId, removeTask) => {
    const category = categories[categoryId];
    const newItems = [];

    setCategories({
      ...categories,
      [categoryId]: {
        ...category,
        items: newItems,
      },
    });
  };

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
    <div className='app'>
      <button onClick={addNewCategory}>Add New Category</button>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, categories, setCategories)}>
        <div className='categories-container'>
          {Object.entries(categories).map(([id, category]) => (
            <Category key={id} categoryId={id} category={category} addNewTask={addNewTask} removeTask={removeTask} editTask={editTask}/>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
