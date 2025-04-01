import React, { createContext, useContext, useState, useEffect } from 'react';
import { getlists, deleteList, deleteItem } from '@/lib/supabaseQueries';
import { Alert } from 'react-native';

const ListContext = createContext(null);

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState<{ id: any; name: any; items: { name: any; quantity: any; bought: any; }[]; }[]>([]);

  // Fetch lists from Supabase
  const fetchLists = async () => {
    const data = await getlists();
    setLists(data || []);
  };

  // Delete a list and refresh
const handleDeleteList = async (listId: string) => {
  try {
    await deleteList(listId);

    // Optimistically update UI before fetching new data
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));

    await fetchLists(); // Ensure it re-fetches the latest data
  } catch (error) {
    console.error('Error deleting list:', error);
  }
};

  const handleItemDeletion = async (
    itemId: string,

  ) => {
    try {
      const deletedItem = await deleteItem(itemId);

      if (deletedItem) {
        console.log('Item deleted successfully:', deletedItem);
        // Optimistically update UI before fetching new data
        setLists((prevLists) =>
          prevLists.map((list) => ({
            ...list,
            items: list.items.filter((item) => item.id !== itemId),
          })),
        );
        await fetchLists(); // Ensure it re-fetches the latest data
      } else {
        console.error('Error deleting item');
        Alert.alert('Error', 'Failed to delete the item. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error deleting item:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <ListContext.Provider value={{ lists, fetchLists, handleDeleteList,handleItemDeletion }}>
      {children}
    </ListContext.Provider>
  );
};

// Custom hook for using the list context
export const useList = () => useContext(ListContext);
