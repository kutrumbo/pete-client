import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks';

import { find, groupBy, map, minBy, reverse, toPairs } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { camelCaseObject, dateRangeUntilToday, dateString } from '../utils';

import { FETCH_EVENTS } from '../gql';
import ListSeparator from '../components/ListSeparator';

const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';

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
    const showActivity = find(eventsByDate[date], event => event.activityId === pair[0]);
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

const TrendsScreen = () => {
  const { loading, error, data } = useQuery(FETCH_EVENTS);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (loading && !events) {
    return <ActivityIndicator size="large" />;
  }

  const events = map(data.events, rawEvent => camelCaseObject(rawEvent));
  const firstDate = minBy(events, event => event.date).date;
  const dateRange = dateRangeUntilToday(new Date(firstDate));
  const reversedDates = reverse(map(dateRange, date => dateString(date)));
  const eventsByDate = groupBy(events, event => event.date);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={reversedDates}
        renderItem={({ item }) => <Item date={item} eventsByDate={eventsByDate} />}
        keyExtractor={item => item}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

TrendsScreen.navigationOptions = {
  title: 'Trends',
};

export default TrendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.background,
  },
  row: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  activitiesContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
