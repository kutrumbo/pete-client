import React, { useReducer } from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import { map } from 'lodash';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const INITIAL_DATA = [
  {
    id: 'mindfulness',
    title: 'Mindfulness',
    active: false,
  },
  {
    id: 'running',
    title: 'Running',
    active: false,
  },
  {
    id: 'sport',
    title: 'Sport',
    active: false,
  },
  {
    id: 'surfing',
    title: 'Surfing',
    active: false,
  },
  {
    id: 'yoga',
    title: 'Yoga',
    active: false,
  },
];

function Item({ active, dispatch, id, title }) {
  return (
    <TouchableHighlight
      style={[styles.item, active && styles.activeItem]}
      onPress={() => dispatch({ id })}
      underlayColor={Colors.lightTintColor}>
      <Text style={styles.itemLabel}>{title}</Text>
    </TouchableHighlight>
  );
}

function reducer(state, action) {
  return map(state, item => (item.id === action.id ? { ...item, active: !item.active } : item));
}

export default function ActivityScreen() {
  const [state, dispatch] = useReducer(reducer, INITIAL_DATA);

  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        renderItem={({ item }) => <Item {...item} dispatch={dispatch} />}
        keyExtractor={item => item.id}
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
    padding: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeItem: {
    backgroundColor: Colors.lightTintColor,
  },
  itemLabel: {
    fontSize: 18,
  },
});
