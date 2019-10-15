import React from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const DATA = [
  {
    id: 'mindfulness',
    title: 'Mindfulness',
  },
  {
    id: 'running',
    title: 'Running',
  },
  {
    id: 'sport',
    title: 'Sport',
  },
  {
    id: 'surfing',
    title: 'Surfing',
  },
  {
    id: 'yoga',
    title: 'Yoga',
  },
];

function onPress() {
  console.log('hi');
}

function Item({ active, title }) {
  return (
    <TouchableHighlight
      style={[styles.item, active && styles.activeItem]}
      onPress={onPress}
      underlayColor={Colors.lightTintColor}>
      <Text style={styles.itemLabel}>{title}</Text>
    </TouchableHighlight>
  );
}

export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item {...item} />}
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
