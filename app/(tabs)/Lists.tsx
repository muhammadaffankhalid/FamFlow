// app/tabs/Lists.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ActiveLists from '@/components/custom/activeList';
import NewList from '@/components/custom/newList';
import Item from '@/components/custom/item';
export default function ListsScreen() {
  const [newListVisible, setNewListVisible] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(false);
  const [itemID, setItemID] = React.useState<string | null>(null);
  const handleitemIDPress = (itemID: string) => {
    setItemID(itemID);
  };
  return (
    <View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <ActiveLists
          onNewListPress={() => setNewListVisible(true)}
          onactivelistPress={() => setActiveItem(true)}
          onitemidPress={  handleitemIDPress}
    

        />
      </ScrollView>
      {activeItem && <Item onactivelistPress={() => setActiveItem(false)} itemID={itemID} />}
      {newListVisible && <NewList onClose={() => setNewListVisible(false)} />}
        
    </View>
  );
}


