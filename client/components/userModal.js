import React from 'react';

export default function UserModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className='user-modal'>
      <div className='user-modal-content'>
        <h2>Create New User</h2>
        <form onSubmit={onSubmit}>
          <input name='name' placeholder='Username' required />
          <button type='submit'>Create User</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
