import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { addlistandItems } from '@/lib/supabaseQueries';
import { getHomeID } from '@/lib/supabaseQueries';
import { useList } from '@/context/listContent';

function NewList({ onClose }: { onClose: () => void }) {
  const { fetchLists } = useList();

  const [items, setItems] = useState<
    { name: string; quantity: number; bought: boolean }[]
  >([]);
  const [itemName, setItemName] = useState('');
  const [homeID, setHomeID] = useState('');

  useEffect(() => {
    const homeid = async () => {
      const homeId = await getHomeID();
      if (homeId && homeId.length > 0) {
        setHomeID(homeId[0].id.toString());
      } else {
        console.error('Home ID is null or empty');
      }
    };
    homeid();
  }, []);

  const handleAddItem = () => {
    if (itemName.trim() === '') {
      Alert.alert('Please enter an item name');
      return;
    }
    setItems([...items, { name: itemName, quantity: 1, bought: false }]);
    setItemName(''); // Clear input after adding
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const handleSubmitForm = async (values: { title: string }) => {
    if (items.length === 0) {
      Alert.alert('Please add at least one item');
      return;
    }
    try {
      await addlistandItems(values.title, items, homeID);
      Alert.alert('List created successfully');
      setItems([]); // Clear items after saving
      onClose(); // Close the form/modal
      fetchLists(); // Refresh the list data
    } catch (error) {
      console.error('Error creating list:', error);
      Alert.alert('Error creating list');
    }
  };

  return (
    <View className="absolute inset-0 z-50 h-screen">
      <View className="flex-1 bg-white overflow-hidden rounded-lg opacity-100">
        {/* Header */}
        <View className="flex flex-row justify-between items-center p-4">
          <TouchableOpacity onPress={onClose}>
            <Icon name="circle-with-cross" size={20} color="#333" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">New List</Text>
          <View />
        </View>

        {/* Form */}
        <Formik
          initialValues={{ title: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View className="p-4 gap-4">
              {/* Title field */}
              <Text className="text-xl font-bold">Title</Text>
              <TextInput
                className="border border-gray-300 rounded-md p-2"
                placeholder="Enter list title"
                placeholderTextColor="#999"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {touched.title && errors.title && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.title}
                </Text>
              )}

              {/* Add items */}
              <Text className="text-xl font-bold mt-4">Items</Text>
              <View className="flex flex-row gap-2 h-10">
                <TextInput
                  className="border border-gray-300 rounded-md flex-1 px-2"
                  placeholder="Enter item name"
                  placeholderTextColor="#999"
                  value={itemName}
                  onChangeText={setItemName}
                />
                <TouchableOpacity
                  className="ml-2 bg-blue-500 rounded-md w-10 items-center justify-center"
                  onPress={handleAddItem}
                >
                  <Icon name="plus" size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Display items */}
              {items.length > 0 && (
                <FlatList
                  data={items}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View className="flex flex-row items-center p-2 border-b border-gray-200">
                      <Icon2 name="shopping-cart" size={20} color="#333" />
                      <Text className="ml-2 text-lg flex-1">{item.name}</Text>
                      <Text className="mr-2">Qty: {item.quantity}</Text>
                      <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                        <Icon name="trash" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  )}
                  style={{ maxHeight: 200 }}
                />
              )}

              <View className="h-[1px] bg-gray-300 my-2" />

              {/* Save button */}
              <TouchableOpacity
                className="bg-blue-500 py-3 rounded-md items-center mt-4"
                onPress={() => handleSubmit()}
              >
                <Text className="text-lg font-bold text-white">Save List</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        {/* Footer */}
        <View>
          <Text className="text-xl font-bold p-3">Options</Text>
          <View className="flex flex-row items-center p-3">
            <Icon name="bell" size={20} color="#333" />
            <Text className="ml-2 text-lg">Notify Members</Text>
            <TouchableOpacity className="ml-auto">
              <Icon2 name="toggle-on" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default NewList;
