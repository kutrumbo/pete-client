import React, { useReducer } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { map } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import ListSeparator from '../components/ListSeparator';

function Item({ active, dispatch, id, title }) {
  const iconName = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

  return (
    <TouchableWithoutFeedback onPress={() => dispatch({ id })}>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>{title}</Text>
        {active && <Ionicons name={iconName} size={40} color={Colors.tabIconSelected} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

function reducer(state, action) {
  return map(state, item => (item.id === action.id ? { ...item, active: !item.active } : item));
}

export default function ActivityScreen() {
  const [state, dispatch] = useReducer(reducer, Activities);

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        renderItem={({ item }) => <Item {...item} dispatch={dispatch} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
}

ActivityScreen.navigationOptions = {
  title: 'Activity',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.background,
  },
  item: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontSize: 18,
  },
});
