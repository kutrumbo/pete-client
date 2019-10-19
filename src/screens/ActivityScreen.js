import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { find, map } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { dateString } from '../utils';

import { toggleActivity } from '../redux/ducks/events';
import ListSeparator from '../components/ListSeparator';

const mapDispatch = { toggleActivity };
const mapState = state => ({
  // TODO: use selector for performance
  // TODO: think about how to handle date change
  events: state.events,
});

function Item({ date, events, icon, id, title, toggleActivity }) {
  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
  const active = find(events, event => event.activityId === id && date === event.date);

  return (
    <TouchableWithoutFeedback onPress={() => toggleActivity({ activityId: id, date })}>
      <View style={styles.item}>
        <View style={styles.activityLabel}>
          <Ionicons
            style={styles.activityIcon}
            name={`${iconPrefix}-${icon}`}
            size={48}
            color={Colors.tabIconSelected}
          />
          <Text style={styles.activityTitle}>{title}</Text>
        </View>
        {active && (
          <Ionicons name={`${iconPrefix}-checkmark`} size={48} color={Colors.tabIconSelected} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const ActivityScreen = ({ events, toggleActivity }) => {
  const activitiesList = map(Activities, (value, id) => ({ id, ...value }));

  return (
    <View style={styles.container}>
      <FlatList
        data={activitiesList}
        renderItem={({ item }) => (
          <Item {...item} date={dateString()} events={events} toggleActivity={toggleActivity} />
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
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityLabel: {
    flex: 1,
    flexDirection: 'row',
  },
  activityIcon: {
    width: 40,
    textAlign: 'center',
  },
  activityTitle: {
    padding: 16,
    fontSize: 18,
  },
});
