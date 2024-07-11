// Counter.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setUser } from './actions';

const Counter = () => {
  const count = useSelector(state => state.counter.count);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Set User" onPress={() => dispatch(setUser({ name: 'John Doe' }))} />
      {user && <Text>User: {user.name}</Text>}
    </View>
  );
};

export default Counter;