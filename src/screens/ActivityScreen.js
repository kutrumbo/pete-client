import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import uuid from 'uuid/v4';
import { find, map } from 'lodash';

import { createEvent, deleteEvent, fetchEvents } from '../api';
import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import { dateString, iconPrefix } from '../utils';

import ListSeparator from '../components/ListSeparator';

function Item({ date, events, icon, name, setState, title }) {
  const existingEvent = find(events, event => event.name === name && date === event.date);

  const handler = () =>
    existingEvent
      ? deleteEvent(existingEvent, events, setState)
      : createEvent({ id: uuid(), name, date }, events, setState);

  // TODO: use the loading check per-activity
  return (
    <TouchableWithoutFeedback onPress={handler}>
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
        {existingEvent && (
          <Ionicons name={`${iconPrefix}-checkmark`} size={48} color={Colors.tabIconSelected} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const ActivityScreen = () => {
  const [state, setState] = useState([true, false, []]);
  const [loading, error, events] = state;

  useEffect(() => {
    fetchEvents(setState);
  }, []);

  if (error) {
    return <Text>Error: {JSON.stringify(error)}</Text>;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const activitiesList = map(Activities, (value, id) => ({ name: id, ...value }));

  return (
    <View style={styles.container}>
      <FlatList
        data={activitiesList}
        renderItem={({ item }) => (
          <Item {...item} date={dateString()} events={events} setState={setState} />
        )}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

ActivityScreen.navigationOptions = {
  title: 'Activity',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: Colors.tintColor,
  },
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    marginTop: 32,
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
