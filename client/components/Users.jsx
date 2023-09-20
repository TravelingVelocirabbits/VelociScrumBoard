import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import UserItem from './UserItem';
import { api } from '../utils/api';

export default function User({ users, userId, addNewUser, removeUser, updateCategories}) {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    // Send the userData to the backend:
    const newUser = await api.createUser(userData);
    console.log(newUser,'newuser is');
    //fetch categories from database
    const categories = await api.getCategory(/*logged in user info*/);  //returns array of categories
    if (newUser) {
      addNewUser(newUser);
      
      //for each category in array, it will create a new add task big component
      categories.forEach(el => {
        updateCategories(el.id, false);
      });
    }
  };

  return (
    <div>
      <h2 className="category-title center-title-vertically" >Users</h2>
      <Droppable droppableId={String(userId)} key={userId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: 4,
              width: 250,
              minHeight: 500,
              background: snapshot.isDraggingOver ? '#cdb4db' : '#ffffff',
              backgroundColor: '#FFFFF',
              borderRadius: '10px',
              border: '1px solid #ccc',
               
            }}
            className='columnShadow'
          >
            {users.map((user, index) => (
              <UserItem key={user._id} user={user} index={index} removeUser={removeUser} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <form onSubmit={handleFormSubmit}>
        <label>NewUser: </label>
        <input className='userInput' name='name' placeholder='Username' required />
        <button className='add-task-button' type='submit'>+ Add</button>
      </form>
    </div>
  );
}
