import React from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@apollo/react-hooks';

import uuid from 'uuid/v4';
import { find, map, noop } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { camelCaseObject, dateString } from '../utils';

import { FETCH_EVENTS, INSERT_EVENT } from '../gql';
import ListSeparator from '../components/ListSeparator';

function Item({ activityId, date, events, icon, insertEvents, title }) {
  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
  const active = find(events, event => event.activityId === activityId && date === event.date);
  const event = {
    id: uuid(),
    activity_id: activityId,
    date,
  };

  const selectActivity = () => {
    insertEvents({
      variables: {
        events: [event],
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => (active ? noop() : selectActivity())}>
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

const ActivityScreen = () => {
  const { loading, error, data } = useQuery(FETCH_EVENTS);
  const [insertEvents] = useMutation(INSERT_EVENT, { refetchQueries: [{ query: FETCH_EVENTS }] });

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (loading && !events) {
    return <Text>Loading</Text>;
  }

  const events = map(data.events, rawEvent => camelCaseObject(rawEvent));
  const activitiesList = map(Activities, (value, id) => ({ activityId: id, ...value }));

  return (
    <View style={styles.container}>
      <FlatList
        data={activitiesList}
        renderItem={({ item }) => (
          <Item {...item} date={dateString()} events={events} insertEvents={insertEvents} />
        )}
        keyExtractor={item => item.activityId}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

ActivityScreen.navigationOptions = {
  title: 'Activity',
};

export default ActivityScreen;

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
