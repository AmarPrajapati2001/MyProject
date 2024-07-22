import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../redux/actions';

const AddDataScreen = ({ navigation, route }) => {
  const { index, existingTodo, category = 'backlog' } = route.params || {};
  console.log('Route Params:', route.params);  // Debugging line
  console.log('Category:', category);  // Debugging line

  const [title, setTitle] = useState(existingTodo ? existingTodo.title : '');
  const [description, setDescription] = useState(
    existingTodo ? existingTodo.description : '',
  );

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title && description) {
      if (existingTodo) {
        dispatch(updateTodo(index, title, description, category));
      } else {
        dispatch(addTodo(title, description, category));
      }
      navigation.goBack();
      console.log('Title:', title);
      console.log('Description:', description);
    } else {
      Alert.alert('Please enter both title and description');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title={existingTodo ? 'Update To-Do' : 'Add To-Do'}
        onPress={handleAddTodo}
      />
    </SafeAreaView>
  );
};

export default AddDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    marginLeft: 16,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});