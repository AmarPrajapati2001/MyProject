import React from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, moveTodo } from '../redux/actions';

const HomeScreen = ({ navigation }) => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const onDeletePress = (index, category) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => dispatch(deleteTodo(index, category))
        }
      ],
      { cancelable: false }
    );
  };

  const handleEdit = (index, todo, category) => {
    navigation.navigate("AddDataScreen", { index, existingTodo: todo, category });
  };

  const handleMove = (index, fromCategory, direction) => {
    const toCategory = direction === 'forward'
      ? getNextCategory(fromCategory)
      : getPreviousCategory(fromCategory);

    dispatch(moveTodo(index, fromCategory, toCategory));
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderCategory = (categoryName, todos) => {
    // Check if there are no todos for the category
    if (todos.length === 0) {
      return null; // Don't render anything if there are no todos
    }
  
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{capitalizeFirstLetter(categoryName)}</Text>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <TouchableOpacity
                onPress={() => handleEdit(index, item, categoryName)}>
                  <View style={{flexDirection:'row'}}>
                <View style={styles.itemContent}>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                </View>
                <TouchableOpacity onPress={() => onDeletePress(index, categoryName)} style={styles.deleteContainer}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
              </TouchableOpacity>
   
              <View style={styles.actionsContainer}>
                {categoryName !== 'backlog' && (
                  <TouchableOpacity onPress={() => handleMove(index, categoryName, 'backward')} style={styles.moveContainer}>
                    <Text style={styles.actionText}>Move Backward</Text>
                  </TouchableOpacity>
                )}
                  {categoryName !== 'completed' && (
                  <TouchableOpacity onPress={() => handleMove(index, categoryName, 'forward')} style={styles.moveContainer}>
                    <Text style={styles.actionText}>Move Forward</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const getNextCategory = (currentCategory) => {
    const categories = ['backlog', 'todo', 'inProgress', 'completed'];
    const currentIndex = categories.indexOf(currentCategory);
    return categories[currentIndex + 1] || 'completed'; // Move forward
  };

  const getPreviousCategory = (currentCategory) => {
    const categories = ['backlog', 'todo', 'inProgress', 'completed'];
    const currentIndex = categories.indexOf(currentCategory);
    return categories[currentIndex - 1] || 'backlog'; // Move backward
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled>
        {Object.keys(todos).map(category => renderCategory(category, todos[category]))}
      </ScrollView>
      <TouchableOpacity style={styles.plus} onPress={() => navigation.navigate("AddDataScreen", { category: 'backlog' })}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Light background color
  },
  categoryContainer: {
    marginBottom: 20,
    paddingHorizontal: 16, // Consistent padding
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333', // Darker text color for better contrast
  },
  plus: {
    height: 60,
    width: 60,
    backgroundColor: '#ff5733', // Vibrant color for the button
    position: 'absolute',
    right: 20,
    bottom: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000', // Add shadow for better depth
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  plusText: {
    color: '#FFF',
    fontSize: 36,
    marginBottom: 2,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ffffff', // White background for items
    borderRadius: 10,
    flexDirection: 'column', // Stack content vertically
    shadowColor: '#000', // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  itemContent: {
    flex: 1,
    maxWidth: 200, // Limit width of title and description
    marginRight: 10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  deleteContainer: {
    backgroundColor: '#e74c3c', // Red color for delete
    padding: 8,
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  moveContainer: {
    backgroundColor: '#3498db', // Blue color for move
    padding: 8,
    height: 35,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
    marginTop: 10,
  },
  actionText: {
    color: '#FFF',
    fontSize: 14,
  }
});

export default HomeScreen;
