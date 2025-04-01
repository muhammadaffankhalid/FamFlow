import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getlists, deleteList, deleteItem } from '@/lib/supabaseQueries';
import { Alert } from 'react-native';

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Define types
interface List {
  id: string;
  name: string;
  created_at: string;
  items: { id: string; name: string,bought:string,quantity:string,created_at:string }[];
}

interface ListContextType {
  lists: List[];
  fetchLists: () => void;
  handleDeleteList: (id: string) => void;
  handleItemDeletion: (id: string) => void;
}

// Create context
const ListContext = createContext<ListContextType | undefined>(undefined);

// Provider component
export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<List[]>([]);



  // Fetch lists from Supabase
  const fetchLists = async () => {
    const fetchedLists = await getlists();
    if (fetchedLists) {
      const formattedLists = fetchedLists.map((list: any) => ({
      
        id: list.id,
        name: list.name,
        created_at:  formatDate(list.created_at || new Date().toISOString()), // Ensure created_at exists
        items: list.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          bought:'false',
          quantity: '1',
          created_at:  formatDate(item.created_at || new Date().toISOString()) // Ensure created_at exists

        })),
      }));
      setLists(formattedLists);
    }
  };

  useEffect(() => {
    fetchLists(); // Fetch lists on mount
  }, []);

  // Delete a list
  const handleDeleteList = async (id: string) => {
    await deleteList(id);
    fetchLists(); // Refresh after deleting
  };
  const handleItemDeletion = async (itemId: string) => {
    try {

      const deletedItem = await deleteItem(itemId);

      if (deletedItem) {
        console.log('Item deleted successfully:', deletedItem);
       
        await fetchLists(); 
     
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
    <ListContext.Provider
      value={{ lists, fetchLists, handleDeleteList, handleItemDeletion }}
    >
      {children}
    </ListContext.Provider>
  );
};

// Hook to use the list context
export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};
