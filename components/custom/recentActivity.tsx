import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';

export default function RecentActivity() {
  const recentActivity = [
    {
      title: 'Mike',
      action: 'added',
      item: 'Milk',
      time: '5m ago',
      Icon: 'shopping-cart',
    },
    {
      title: 'Sarah',
      action: 'added',
      item: 'Decoration',
      time: '1h ago',
      Icon: 'glass',
    },
    {
      title: 'Sarah',
      action: 'added',
      item: 'Decoration',
      time: '1h ago',
      Icon: 'glass',
    },
    {
      title: 'Sarah',
      action: 'added',
      item: 'Decoration',
      time: '1h ago',
      Icon: 'glass',
    },

  ];

  return (
    <View className="flex  mt-2">
      {/* Header */}
      <View className="flex flex-row items-center mb-2">
        <Icon name="clock-rotate-left" size={20} color="#333" />
        <Text className="text-xl font-bold ml-2">Recent Activity</Text>
      </View>

      {/* Recent Activity List */}
      <View className="bg-white rounded-lg p-3 ">
        {recentActivity.map((item,key) => (
          <View key={key} className="flex flex-row items-center justify-between py-2 border-b border-gray-200">
            <View className="flex flex-row items-center">
              <Icon2 name="user" size={20} color="#333" />
              <Text className="ml-2 text-base">
                {item.title} {item.action} {item.item}
              </Text>
            </View>
            <Text className="text-sm text-gray-500">{item.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
