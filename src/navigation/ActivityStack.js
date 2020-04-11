import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ActivityScreen from '../screens/ActivityScreen';
import StackOptions from './StackOptions';

const Stack = createStackNavigator();

export default function ActivityStack() {
  return (
    <Stack.Navigator screenOptions={StackOptions.screenOptions}>
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  );
}
