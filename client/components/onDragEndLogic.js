const dbURI = 'http://localhost:3000/route';

// Helper function to reorder an array based on the start and end indices
const reorderArray = (array, startIndex, endIndex) => {
  // Cache variable to store the element being moved (at startIndex)
  const [removed] = array.splice(startIndex, 1);
  // Reinsert the removed element at the passed in endIndex
  array.splice(endIndex, 0, removed);
  return array;
};

// Helper function to update the category of the task item in the backend
const updateTaskInDatabase = (updatedTask) => {
  // fetch(`${dbURI}/task/`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     _id: updatedTask._id,
  //     Category: updatedTask.Category,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {})
  //   .catch((error) => {
  //     console.error(
  //       'Error from updateTaskInDatabase function in OnDragEndLogic: ',
  //       error
  //     );
  //   });
};

const deleteTaskFromDatabase = (updatedTask) => {
  // console.log(`the task being deleted is: ${updatedTask}`);
  // fetch(`${dbURI}/task/`, {
  //   method: 'DELETE',
  //   header: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     _id: updatedTask._id,
  //     Category: updatedTask.Category,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then(() => {})
  //   .catch((error) => {
  //     console.error(
  //       'deleteTaskFromDatabase in onDragEndLogic suffered and error trying to delete task: ',
  //       error
  //     );
  //   });
};

// Helper function to delete and replace a task
const deleteAndReplaceTask = (destItems, destination, removed) => {
  const itemToDelete = destItems[destination.index];

  destItems.splice(destination.index, 1);
  deleteTaskFromDatabase(itemToDelete);
  destItems.splice(destination.index, 0, removed);
};

export const onDragEnd = (
  result,
  categories,
  setCategories,
  users,
  setUsers,
  setActiveIndex,
  setActiveDroppableId
) => {
  const { source, destination } = result;

  // If dropped out of bounds, end the function (and return item to starting point)
  if (!destination) return;

  // Declare a boolean variable set to the output of checking if droppable id is userCategory
  const isUserCategory = source.droppableId === 'userCategory';
  // Declare a boolean variable set to the output of checking if droppable id is same as destination id
  const isSameCategory = source.droppableId === destination.droppableId;

  const sourceCategory = categories[source.droppableId];
  const destCategory = categories[destination.droppableId];
  const sourceItems = [...(sourceCategory?.items || [])];
  const destItems = [...(destCategory?.items || [])];

  const [removed] = sourceItems.splice(source.index, 1);

  if (isSameCategory) {
    sourceItems.splice(destination.index, 0, removed);
    setCategories({
      ...categories,
      [source.droppableId]: { ...sourceCategory, items: sourceItems },
    });
  } else {
    if (destItems.length > destination.index) {
      console.log(
        'destItems is ',
        destItems,
        ' destination is ',
        destination,
        ' and removed is ',
        removed
      );
      deleteAndReplaceTask(destItems, destination, removed);
    } else {
      destItems.splice(destination.index, 0, removed);
    }
    if (Object.prototype.hasOwnProperty.call(removed, 'Category')) {
      removed.Category = destination.droppableId;
    }
    setCategories({
      ...categories,
      [source.droppableId]: { ...sourceCategory, items: sourceItems },
      [destination.droppableId]: { ...destCategory, items: destItems },
    });
  }

  setActiveIndex(null);
  setActiveDroppableId(null);
  updateTaskInDatabase(removed);
};
