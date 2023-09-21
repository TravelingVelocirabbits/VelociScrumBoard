import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import UserItem from './UserItem';
import { api } from '../utils/api';

export default function User({ users, userId, reRender, removeUser, addNewTask}) {
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value) => {
      userData.username = value;
    });
    console.log('userdata is', userData);
    //fetch categories from database
    const categories = await api.getCategory();  //returns array of categories
    
    // creates a user and re-renders
    const newUser = await api.createUser(userData);
    if (newUser.username) {
      categories.forEach(el => {
        addNewTask(el, false);
      });
      reRender();
    
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
