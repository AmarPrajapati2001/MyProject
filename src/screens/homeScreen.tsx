import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  console.log("*****HomeScreen");

  useEffect(() => {
    // const splashTimeout = setTimeout(() => {
    //   isUserLogin();
    // }, 3000);

    // return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
export default HomeScreen;

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

