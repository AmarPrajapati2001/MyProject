import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/homeScreen';
import { NavigationContainer } from '@react-navigation/native';

function App(): React.JSX.Element {

  const Stack = createStackNavigator();
  const navigationRef = React.createRef<any>();

  return (
      <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
    </NavigationContainer>
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
