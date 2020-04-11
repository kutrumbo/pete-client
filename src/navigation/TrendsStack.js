import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import TrendsScreen from '../screens/TrendsScreen';
import StackOptions from './StackOptions';

const Stack = createStackNavigator();

export default function TrendsStack() {
  return (
    <Stack.Navigator screenOptions={StackOptions.screenOptions}>
      <Stack.Screen name="Trends" component={TrendsScreen} />
    </Stack.Navigator>
  );
}
