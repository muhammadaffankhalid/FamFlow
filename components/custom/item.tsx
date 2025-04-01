import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity,Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome6';


import { useList } from '@/context/listContent';

function Item({
  onactivelistPress,
  itemID,

}: {
  onactivelistPress: () => void;
  itemID: string | null;

}) {



  const listContext = useList();
  if (!listContext) {
    console.error(
      'useList() returned null. Ensure the ListProvider is wrapping this component.',
    );
  
  }
  const { lists, handleDeleteList,handleItemDeletion } = listContext;
function formatTime(dateString) {
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

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
              onPress={() => {handleDeleteList( itemID || ''); onactivelistPress();} }
            />
          </TouchableOpacity>
        </View>
        {/* List Header */}
        <View className="justify-between gap-4 p-4">
          <View className="flex flex-row items-center gap-4">
            <View className="flex-1 flex-row items-center gap-4">
              <Icon name="clipboard-list" size={20} color="#333" />
              <Text className="text-black text-2xl font-bold">
                {lists.find((list) => list.id === itemID)?.name}
              </Text>
            </View>
            <Text className="text-gray-500">{lists.find((list)=>list.id===itemID)?.created_at}</Text>
          </View>

          {/* List Items */}
          {lists.flatMap((item) => (
          
            item.items.map((units) => (
      
            <View key={units.id} className="flex flex-row items-center gap-4">
              <View className="flex-1 flex-row items-center gap-4">
                <Icon2 name="square-o" size={15} color="#333" />
                <Text className="text-xl">{units.name}</Text>
              </View>
              <Text className="text-gray-500">{units.quantity}</Text>
              <Text className="text-gray-500">{formatTime(units.created_at)}</Text>
              <TouchableOpacity
                onPress={() => {handleItemDeletion(units.id)}}
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
            )
          
          )
          ))}
         
        </View>
        
      </View>
    </View>
  );
}

export default Item;
