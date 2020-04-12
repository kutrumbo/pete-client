import { Ionicons } from '@expo/vector-icons';
import { find, groupBy, map, minBy, reverse, toPairs } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { fetchEvents } from '../api';
import ListSeparator from '../components/ListSeparator';
import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import { dateRangeUntilToday, dateString, iconPrefix } from '../utils';

function ActivityIcon({ activityIcon }) {
  return (
    <Ionicons
      style={styles.activityIcon}
      name={`${iconPrefix}-${activityIcon}`}
      size={48}
      color={Colors.tabIconSelected}
    />
  );
}

function Item({ date, eventsByDate }) {
  const activityIcons = map(toPairs(Activities), pair => {
    const showActivity = find(eventsByDate[date], event => event.name === pair[0]);
    return showActivity ? (
      <ActivityIcon key={[pair[0]]} activityIcon={pair[1].icon} />
    ) : (
      <View key={pair[0]} style={styles.activitySpacer} />
    );
  });

  return (
    <View key={date} style={styles.row}>
      <Text style={styles.dateLabel}>{date}</Text>
      <View style={styles.activitiesContainer}>{activityIcons}</View>
    </View>
  );
}

export default function TrendsScreen({ navigation }) {
  const [state, setState] = useState([true, false, []]);
  const [loading, error, events] = state;

  useEffect(() => {
    // TODO: confirm that this is best approach
    navigation.addListener('focus', () => {
      fetchEvents(setState);
    });
    fetchEvents(setState);
  }, []);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const firstEventTime = minBy(events, event => event.time).time;
  const dateRange = dateRangeUntilToday(new Date(firstEventTime));
  const reversedDates = reverse(map(dateRange, date => dateString(date)));
  const eventsByDate = groupBy(events, event => dateString(event.time));

  return (
    <View>
      <FlatList
        data={reversedDates}
        renderItem={({ item }) => <Item date={item} eventsByDate={eventsByDate} />}
        keyExtractor={item => item}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  activitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    marginTop: 32,
  },
  activityIcon: {
    width: 40,
    textAlign: 'center',
  },
  activitySpacer: {
    width: 40,
  },
  dateLabel: {
    paddingVertical: 16,
    paddingRight: 16,
    fontSize: 18,
  },
});
