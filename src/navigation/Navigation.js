import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import ActivityStack from './ActivityStack';
import GoalsStack from './GoalsStack';
import TrendsStack from './TrendsStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
