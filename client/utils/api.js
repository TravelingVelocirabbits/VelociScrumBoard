const BASE_URL = 'http://localhost:3000';

export const api = {
  createCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response;
  },

  removeCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response;
  },

  editCategory: async (categoryData) => {
    const response = await fetch(`${BASE_URL}/route/category`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return await response;
  },

  createUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/route/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response;
  },

  removeUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/route/removeuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response;
  },

  createTask: async (taskData) => {
    console.log('HIMILFKJAOWIERJOIAJER');
    const response = await fetch(`${BASE_URL}/route/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return await response;
  },
};
