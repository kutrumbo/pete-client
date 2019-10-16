import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { find, map } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import { toggleActivity } from '../redux/ducks/events';
import ListSeparator from '../components/ListSeparator';

const mapDispatch = { toggleActivity };
const mapState = state => ({
  // TODO: use selector for performance
  // TODO: think about how to handle date change
  events: state.events,
});

function Item({ events, id, title, toggleActivity }) {
  const iconName = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';
  // TODO: take into account date
  const active = find(events, event => event.activityId === id);

  return (
    <TouchableWithoutFeedback onPress={() => toggleActivity({ activityId: id })}>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>{title}</Text>
        {active && <Ionicons name={iconName} size={48} color={Colors.tabIconSelected} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const ActivityScreen = ({ events, toggleActivity }) => {
  const activitiesList = map(Activities, (title, id) => ({ id, title }));
  return (
    <View style={styles.container}>
      <FlatList
        data={activitiesList}
        renderItem={({ item }) => (
          <Item {...item} events={events} toggleActivity={toggleActivity} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

ActivityScreen.navigationOptions = {
  title: 'Activity',
};

export default connect(
  mapState,
  mapDispatch
)(ActivityScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.background,
  },
  item: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    paddingVertical: 16,
    fontSize: 18,
  },
});
