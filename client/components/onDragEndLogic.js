// Helper function to reorder an array based on the start and end indices
const reorderArray = (array, startIndex, endIndex) => {
  // Cache variable to store the element being moved (at startIndex)
  const [removed] = array.splice(startIndex, 1);
  // Reinsert the removed element at the passed in endIndex
  array.splice(endIndex, 0, removed);
  return array;
};

export const onDragEnd = (
  result,
  categories,
  setCategories,
  users,
  setUsers
) => {
  const { source, destination } = result;
  console.log('source is: ', source);
  console.log('destination is: ', destination);

  // If dropped out of bounds, end the function (and return item to starting point)
  if (!destination) return;

  // setActiveIndex(destination.index);
  // setActiveDroppableId(destination.droppableId);

  // Declare a boolean variable set to the output of checking if droppable id is userCategory
  const isUserCategory = source.droppableId === 'userCategory';

  // Declare a boolean variable set to the output of checking if droppable id is same as destination id
  const isSameCategory = source.droppableId === destination.droppableId;

  // Drag and drop in the user category
  if (isUserCategory && users) {
    // invoke the helper function to reorder the user array and update its state
    const newUsers = reorderArray([...users], source.index, destination.index);
    setUsers(newUsers);
    return;
  }

  // Drag and drop in the other categories
  if (isSameCategory) {
    // get the category and its items
    const category = categories[source.droppableId];

    if (category && category.NewItems) {
      // invoke the helper function to reorder the items and update the state
      const newItems = reorderArray(
        [...category.newItems],
        source.index,
        destination.index
      );
      setCategories({
        ...categories,
        [source.droppableId]: {
          ...category,
          items: newItems,
        },
      });
    }
    return;
  }

  // Handle moving bewteen different categories
  // Extract the source and destination categories and their items
  const sourceCategory = categories[source.droppableId];
  const destCategory = categories[destination.droppableId];
  const sourceItems = [...sourceCategory.items];
  const destItems = [...destCategory.items];

  // Remove the item from its source and add it to the destination category
  const [removed] = sourceItems.splice(source.index, 1);
  destItems.splice(destination.index, 0, removed);

  // update the state to reflect teh changes in source and destination categories
  setCategories({
    ...categories,
    [source.droppableId]: {
      ...sourceCategory,
      items: sourceItems,
    },
    [destination.droppableId]: {
      ...destCategory,
      items: destItems,
    },
  });
  setActiveIndex(null);
  setActiveDroppableId(null);
};
