import { useEffect, useState } from 'react';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import NewList from './newList';
import { getlists } from '@/lib/supabaseQueries';
import { useList } from '@/context/listContent';
const ActiveLists = ({
  onNewListPress,
  onactivelistPress,
  onitemidPress,

}: {
  onNewListPress: () => void;
  onactivelistPress: () => void;
  onitemidPress: (itemID: string) => void;

}) => {
  const [activeLists, setActiveLists] = useState<
    { title: string; Icon: string; time: string; items: string[]; id: string }[]
  >([]);


  useEffect(() => {
    const fetchLists = async () => {
      const lists = await getlists();
      if (lists) {
        const formattedLists = lists.map((list) => ({
          title: list.name,
          Icon: 'clipboard-list',
          time: 'Today',
          items: list.items.map((item) => item.name),
          id: list.id,
        }));
        setActiveLists(formattedLists);
      }
    };

    fetchLists();
  }, []);


  const listContext = useList();

  if (!listContext) {
    console.error('useList() returned null. Ensure the ListProvider is wrapping this component.');
    return null;
  }

  const { lists, handleDeleteList } = listContext;
  
  return (
    <>
      {/* Header */}

      <View className="flex flex-row justify-between items-center p-2">
        <View className="flex flex-row items-center">
          <Icon2 name="clipboard-list" size={20} color="#333" />
          <Text className="text-lg font-bold ml-2">Active Lists</Text>
        </View>
        <TouchableOpacity
          className="flex flex-row items-center bg-blue-700 px-3 py-1 rounded-md"
          onPress={onNewListPress}
        >
          <Icon2 name="plus" size={16} color="#fff" />
          <Text className="text-white ml-1 text-sm">New List</Text>
        </TouchableOpacity>
      </View>

      {/* Active Lists */}
      <View className="bg-white rounded-lg p-3">
        {activeLists.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            className="mb-3 border-b border-gray-200 pb-2"
            onPress={() => {
              onactivelistPress();
              onitemidPress(item.id);
            }}
          >
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row items-center">
                <Icon2 name="cart-shopping" size={20} color="#333" />
                <Text className="text-base font-medium ml-2">{item.title}</Text>
              </View>
              <Text className="text-xs text-gray-500">{item.time}</Text>
            </View>
            <View className="mt-1 ml-6">
              {item.items.map((grocery, idx) => (
                <View key={idx} className="flex flex-row items-center mb-1">
                  <Icon name="square-o" size={14} color="#333" />
                  <Text className="ml-2 text-sm">{grocery}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default ActiveLists;
