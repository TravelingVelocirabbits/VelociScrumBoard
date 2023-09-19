import React, { useState } from 'react';
import { api } from '../utils/api';
import './AddCategory.css'; 

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
    <div className="add-category-container">
      <input
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        // placeholder='Category Name'
        // className="add-category-input"
      />
      <button onClick={handleSubmit}>Add Category</button>
    </div>
  );
}
