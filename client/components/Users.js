import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import UserItem from './userItem';
import UserModal from './userModal';
import { api } from '../utils/api';

export default function User({ users, userId, addNewUser }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
      addNewUser(userId, newUser);
      handleCloseModal();
    }
  };

  return (
    <div>
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
      <button onClick={handleOpenModal}>Add New User</button>
      <UserModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
    </div>
  );
}
