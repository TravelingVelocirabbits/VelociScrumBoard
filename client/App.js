import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Category from './components/Category';
import Task from './components/Task';

const testTasks = [
  { id: uuidv4(), content: '1st Task' },
  { id: uuidv4(), content: '2nd Task' },
];

const initialCategories = {
  [uuidv4()]: {
    name: 'Todo',
    items: testTasks,
  },
};

const onDragEnd = (result, categories, setCategories) => {
  if (!result.destination) return;
  const { source, destination } = result;
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

  const addNewTask = (categoryId) => {
    const newTask = { id: uuidv4(), content: 'New Task' };
    const category = categories[categoryId];
    category.items.push(newTask);
    setCategories({
      ...categories,
      [categoryId]: category,
    });
  };

  return (
    <div className='app'>
      <button onClick={addNewCategory}>Add New Category</button>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, categories, setCategories)}>
        {Object.entries(categories).map(([id, category]) => (
          <Category key={id} categoryId={id} category={category} addNewTask={addNewTask} />
        ))}
      </DragDropContext>
    </div>
  );
}
