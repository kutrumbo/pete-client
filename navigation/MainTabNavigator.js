import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import ActivityScreen from '../screens/ActivityScreen';
import TrendsScreen from '../screens/TrendsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ActivityStack = createStackNavigator(
  {
    Activity: ActivityScreen,
  },
  config
);

ActivityStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} />
  ),
};

ActivityStack.path = '';

const TrendsStack = createStackNavigator(
  {
    Trends: TrendsScreen,
  },
  config
);

TrendsStack.navigationOptions = {
  tabBarLabel: 'Trends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-trending-up' : 'md-trending-up'}
    />
  ),
};

TrendsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    ActivityStack,
    TrendsStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
    },
  }
);

tabNavigator.path = '';

export default tabNavigator;
