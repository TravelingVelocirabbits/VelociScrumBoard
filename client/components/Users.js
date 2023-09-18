import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import UserItem from './UserItem';
import { api } from '../utils/api';

export default function User({ users, userId, addNewUser }) {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    // Send the taskData to the backend:
    const newUser = await api.createUser(userData);

    if (newUser) {
      addNewUser(newUser);
    }
  };

  return (
    <div>
      Users
      <Droppable droppableId={String(userId)} key={userId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
              padding: 4,
              width: 250,
              minHeight: 500,
            }}
          >
            {users.map((user, index) => (
              <UserItem key={user._id} user={user} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <form onSubmit={handleFormSubmit}>
        <input name='name' placeholder='Username' required />
        <button type='submit'>Create User</button>
      </form>
    </div>
  );
}
