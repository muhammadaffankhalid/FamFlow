import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { getItem } from '@/lib/supabaseQueries';
import { deleteItem } from '@/lib/supabaseQueries';
import { deleteList } from '@/lib/supabaseQueries';

import { useList } from '@/context/listContent';

function Item({
  onactivelistPress,
  itemID,

}: {
  onactivelistPress: () => void;
  itemID: string | null;

}) {
  const [data, setData] = React.useState<{
    name: string;
    Icon: string;
    time: string;
    id: string;
    items: { name: string; id: string }[];
  } | null>(null);

  useEffect(() => {
    const fetchLists = async () => {
      if (!itemID) return;

      const list = await getItem(itemID);

      if (list) {
        setData({
          name: list.name,
          Icon: 'clipboard-list',
          time: 'Today',
          items: list.items
            ? list.items.map((item) => ({ name: item.name, id: item.id }))
            : [],
          id: list.id,
        });
      }
    };

    fetchLists();
  }, [itemID]);

  const refeshlist = async () => {
    if (!itemID) return;
    const updatedList = await getItem(itemID);
    setData(
      updatedList
        ? {
            name: updatedList.name,
            Icon: 'clipboard-list',
            time: 'Today',
            items: updatedList.items
              ? updatedList.items.map((item) => ({
                  name: item.name,
                  id: item.id,
                }))
              : [],
            id: updatedList.id,
          }
        : null,
    );
  };
  const handlelistDeletion = async (listId: string) => {
    try {
      const deletedList = await deleteList(listId);
      if (deletedList) {
        console.log('List deleted successfully:', deletedList);
        // refeshlist(); // Refresh the list after deletion
        Alert.alert('Success', 'List deleted successfully.');
        onactivelistPress(); // Close the list view
      } else {
        console.error('Error deleting list');
        Alert.alert('Error', 'Failed to delete the list. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error deleting list:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };
  const handleItemDeletion = async (
    itemId: string,
    refreshList: () => void,
  ) => {
    try {
      const deletedItem = await deleteItem(itemId);

      if (deletedItem) {
        console.log('Item deleted successfully:', deletedItem);
        refreshList(); // Refresh the list after deletion
      } else {
        console.error('Error deleting item');
        Alert.alert('Error', 'Failed to delete the item. Please try again.');
      }
    } catch (error) {
      console.error('Unexpected error deleting item:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const listContext = useList();
  if (!listContext) {
    console.error(
      'useList() returned null. Ensure the ListProvider is wrapping this component.',
    );
    return null;
  }
  const { lists, handleDeleteList } = listContext;


  return (
    <View className="absolute inset-0 z-61 h-screen w-screen bg-white opacity-100">
      <View className="flex-1 bg-white overflow-hidden rounded-lg opacity-100">
        {/* Back Button */}
        <View className="flex flex-row gap-2 p-3">
          <TouchableOpacity onPress={onactivelistPress} className="flex-1">
            <Icon name="arrow-left" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="trash"
              size={20}
              color="#333"
              // onPress={() => handlelistDeletion(data?.id || '')}
              onPress={() => handleDeleteList(data?.id || '')}
            />
          </TouchableOpacity>
        </View>
        {/* List Header */}
        <View className="justify-between gap-4 p-4">
          <View className="flex flex-row items-center gap-4">
            <View className="flex-1 flex-row items-center gap-4">
              <Icon name="clipboard-list" size={20} color="#333" />
              <Text className="text-black text-2xl font-bold">
                {data?.name}
              </Text>
            </View>
            <Text className="text-gray-500">{data?.time}</Text>
          </View>

          {/* List Items */}
          {data?.items.map((item) => (
            <View key={item.id} className="flex flex-row items-center gap-4">
              <View className="flex-1 flex-row items-center gap-4">
                <Icon2 name="square-o" size={15} color="#333" />
                <Text className="text-xl">{item.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleItemDeletion(item.id, refeshlist)}
                className="p-2 rounded-full bg-red-200"
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name="trash" size={15} color="#333" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default Item;
