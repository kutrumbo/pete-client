import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks';

import { groupBy, map, uniqBy } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { camelCaseObject } from '../utils';

import { FETCH_EVENTS } from '../gql';

const TrendsScreen = () => {
  const { loading, error, data } = useQuery(FETCH_EVENTS);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (loading && !events) {
    return <Text>Loading</Text>;
  }

  const events = map(data.events, rawEvent => camelCaseObject(rawEvent));
  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
  const dates = map(uniqBy(events, event => event.date), event => event.date);
  const eventsByDate = groupBy(events, event => event.date);

  return (
    <View style={styles.container}>
      {dates.map(date => (
        <View key={date} style={styles.row}>
          <Text>{date}</Text>
          {eventsByDate[date].map(event => (
            <Ionicons
              style={styles.activityIcon}
              key={event.activityId}
              name={`${iconPrefix}-${Activities[event.activityId].icon}`}
              size={48}
              color={Colors.tabIconSelected}
            />
          ))}
        </View>
      ))}
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
    paddingVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityIcon: {
    width: 40,
    textAlign: 'center',
  },
});
