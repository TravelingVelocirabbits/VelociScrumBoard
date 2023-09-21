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

  // Drag and drop in the user category
  if (isUserCategory && users) {
    // invoke the helper function to reorder the user array and update its state
    const newUsers = reorderArray([...users], source.index, destination.index);
    setUsers(newUsers);
    return;
  }

  // get the category and its items
  const category = categories[source.droppableId];
  const items = category?.items ? [...category.items] : [];

  // Re-order within the same category
  if (isSameCategory) {
    const reorderedItems = reorderArray(items, source.index, destination.index);
    setCategories({
      ...categories,
      [source.droppableId]: { ...category, items: reorderedItems },
    });
    return;
  } else {
    // handle moving between different categories
    const destCategory = categories[destination.droppableId];
    const destItems = destCategory ? [...destCategory.items] : [];

    // Remove the dragged item from its source
    const [removed] = items.splice(source.index, 1);

    // Remove the item at the destination index, if it exists
    if (destItems.length > destination.index) {
      destItems.splice(destination.index, 1);
    }

    // Insert removed item into destination category
    destItems.splice(destination.index, 0, removed);

    // update the state to reflect teh changes in source and destination categories
    setCategories({
      ...categories,
      [source.droppableId]: {
        ...category,
        items,
      },
      [destination.droppableId]: {
        ...destCategory,
        items: destItems,
      },
    });
  }

  setActiveIndex(null);
  setActiveDroppableId(null);
};
