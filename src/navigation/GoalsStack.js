import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import GoalsScreen from '../screens/GoalsScreen';
import StackOptions from './StackOptions';

const Stack = createStackNavigator();

export default function GoalsStack() {
  return (
    <Stack.Navigator screenOptions={StackOptions.screenOptions}>
      <Stack.Screen name="Goals" component={GoalsScreen} />
    </Stack.Navigator>
  );
}
