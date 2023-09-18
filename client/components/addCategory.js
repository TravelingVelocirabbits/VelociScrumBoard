import React, { useState } from 'react';
import { api } from '../utils/api';

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async () => {
    try {
      const data = await api.createCategory({ name: categoryName });
      console.log(data);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder='Category Name'
      />
      <button onClick={handleSubmit}>Add Category</button>
    </div>
  );
}
