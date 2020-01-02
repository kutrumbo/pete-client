import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import ActivityScreen from '../screens/ActivityScreen';
import TrendsScreen from '../screens/TrendsScreen';
import GoalsScreen from '../screens/GoalsScreen';

const ActivityStack = createStackNavigator(
  {
    Activity: ActivityScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Activity',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'} />
      ),
    },
  }
);

const TrendsStack = createStackNavigator(
  {
    Trends: TrendsScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Trends',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-trending-up' : 'md-trending-up'}
        />
      ),
    },
  }
);

const GoalsStack = createStackNavigator(
  {
    Goals: GoalsScreen,
  },
  {
    navigationOptions: {
      tabBarLabel: 'Goals',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-ribbon' : 'md-ribbon'} />
      ),
    },
  }
);

const tabNavigator = createBottomTabNavigator(
  {
    ActivityStack,
    TrendsStack,
    GoalsStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
    },
  }
);

tabNavigator.path = '';

export default tabNavigator;
