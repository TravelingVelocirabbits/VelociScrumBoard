const dbURI = 'http://localhost:3000/route';

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
  console.log(
    `the source is ${JSON.stringify(
      source
    )}, and the destination is ${JSON.stringify(destination)}`
  );
  // If dropped out of bounds, end the function (and return item to starting point)
  if (!destination) return;

  // Declare a boolean variable set to the output of checking if droppable id is userCategory
  const isUserCategory = source.droppableId === 'userCategory';

  // Declare a boolean variable set to the output of checking if droppable id is same as destination id
  const isSameCategory = source.droppableId === destination.droppableId;

  const sourceCategory = categories[source.droppableId];
  console.log('The source category is: ', sourceCategory);
  const destCategory = categories[destination.droppableId];
  console.log('The dest category is: ', destCategory);
  const sourceItems = sourceCategory?.items ? [...sourceCategory.items] : [];
  console.log('The source items are: ', sourceItems);
  const destItems = destCategory?.items ? [...destCategory.items] : [];
  console.log('The dest items are: ', destItems);

  const [removed] = sourceItems.splice(source.index, 1);

  if (isSameCategory) {
    sourceItems.splice(destination.index, 0, removed);
    setCategories({
      ...categories,
      [source.droppableId]: { ...sourceCategory, items: sourceItems },
    });
    console.log('same category!');
    return;
  } else {
    if (destItems.length > destination.index) {
      destItems.splice(destination.index, 1);
    }

    destItems.splice(destination.index, 0, removed);
    if (Object.prototype.hasOwnProperty.call(removed, 'Category')) {
      removed.Category = destination.droppableId;
    }

    console.log('different category!');
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
  fetch(`${dbURI}/task/${updatedTask._id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('task successfully updated');
    })
    .catch((error) => {
      console.error(
        'Error from updateTaskInDatabase function in OnDragEndLogic: ',
        error
      );
    });
};
