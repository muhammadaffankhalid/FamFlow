// app/tabs/index.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActiveLists from '../../components/custom/activeList';
import Members from '@/components/custom/members';
import RecentActivity from '@/components/custom/recentActivity';
import NewList from '@/components/custom/newList';
import Item from '@/components/custom/item';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getlists } from '@/lib/supabaseQueries';

import { useList } from '@/context/listContent';
export default function HomeScreen() {
  const [newListVisible, setNewListVisible] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(false);
  const [itemID, setItemID] = React.useState<string | null>(null);

  


  const { lists, fetchLists } = useList();


  const handleitemIDPress = (itemID: string) => {
    setItemID(itemID);
  };

  useFocusEffect(

      useCallback(() => {
        fetchLists();
      }, []),
    );
         
  return (
    <View style={styles.container}>
      <Members />
      <ActiveLists
        onNewListPress={() => setNewListVisible(true)}
        onactivelistPress={() => setActiveItem(true)}
        onitemidPress={handleitemIDPress}
        
      />
      <RecentActivity />
      {activeItem && (
        <Item
          onactivelistPress={() => {
            setActiveItem(false);
            
          }}
         
          itemID={lists.find((list) => list.id === itemID)?.id || null}
          
        />
      )}
      {newListVisible && <NewList onClose={() => setNewListVisible(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D9D9D9',
  },
});
