import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const Members = () => {
  return (
    <View className=' bg-white rounded-lg p-4 flex-row'>
      <View className='flex-1 flex-row items-center'>
        <Icon name="user" size={32} color="#333" />
        <Icon name="user" size={32} color="#333" />
        <Icon name="user" size={32} color="#333" />
        <Icon name="user" size={32} color="#333" />
      </View>
      <View >
        <View className='bg-teal-700 rounded-lg flex-row items-center gap-2 p-2'>
          <Icon name="users" size={32} color="#fff" />

          <Text className='text-white'>4 Members</Text>
        </View>
        <TouchableOpacity className='items-center' >
          <View className='bg-blue-700 rounded-lg flex-row  gap-2  p-2 mt-2'>
            <Icon name="plus" size={16} color="#fff" />
            <Text className='text-white'>Invite</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Members;
