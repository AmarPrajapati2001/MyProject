import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox, // Import LogBox
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/homeScreen';
import { NavigationContainer } from '@react-navigation/native';
import MatrixScreen from './src/screens/matrixScreen';
import { Provider } from 'react-redux';
import AddDataScreen from './src/screens/addDataScreen';
import { store } from './src/redux/store';

function App(): React.JSX.Element {

  const Stack = createStackNavigator();
  const navigationRef = React.createRef<any>();

  // Suppress specific warnings
  LogBox.ignoreLogs([
    'Warning: ...', // Add specific warnings to ignore
    'Error: ...',   // Add specific errors to ignore
  ]);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Matrix" component={MatrixScreen} />
          <Stack.Screen name="AddDataScreen" component={AddDataScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
