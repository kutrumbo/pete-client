import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import SignInScreen from '../screens/SignInScreen';
import ActivityStack from './ActivityStack';
import GoalsStack from './GoalsStack';
import StackOptions from './StackOptions';
import TrendsStack from './TrendsStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {!signedIn ? (
        <Stack.Navigator screenOptions={StackOptions.screenOptions}>
          <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{ setSignedIn }} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Activity"
          tabBarOptions={{
            activeTintColor: Colors.tabIconSelected,
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              if (route.name === 'Activity') {
                iconName = 'create';
              } else if (route.name === 'Trends') {
                iconName = 'trending-up';
              } else if (route.name === 'Goals') {
                iconName = 'ribbon';
              }
              iconName = Platform.OS === 'ios' ? `ios-${iconName}` : `md-${iconName}`;
              return <TabBarIcon focused={focused} name={iconName} />;
            },
          })}>
          <Tab.Screen name="Activity" component={ActivityStack} />
          <Tab.Screen name="Trends" component={TrendsStack} />
          <Tab.Screen name="Goals" component={GoalsStack} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
