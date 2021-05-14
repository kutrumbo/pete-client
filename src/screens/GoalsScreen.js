import { Ionicons } from '@expo/vector-icons';
import { filter, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { fetchEvents } from '../api';
import ListSeparator from '../components/ListSeparator';
import Colors from '../constants/Colors';
import Activities from '../constants/Activities';
import { dayOfYear, iconPrefix, startOfYear } from '../utils';

export default function GoalsScreen({ navigation }) {
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

  const beginningOfYear = startOfYear();
  const milesMultiplier = 0.000621371;
  const booksRead = filter(events, event => {
    return event.name === 'reading' && new Date(event.time) > beginningOfYear;
  }).length;
  const projectedBooksRead = Math.round(booksRead / (dayOfYear() / 365));

  const runsThisYear = filter(events, event => {
    return event.name === 'running' && new Date(event.time) > beginningOfYear;
  });
  const milesRun = Math.round(sumBy(runsThisYear, event => event.details.distance) * milesMultiplier);
  const projectedMilesRun = Math.round(milesRun / (dayOfYear() / 365));

  const cyclesThisYear = filter(events, event => {
    return event.name === 'cycling' && new Date(event.time) > beginningOfYear;
  });
  const milesCycled = Math.round(sumBy(cyclesThisYear, event => event.details.distance) * milesMultiplier);
  const projectedMilesCycled = Math.round(milesCycled / (dayOfYear() / 365));

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.activityLabel}>
          <Ionicons
            style={styles.activityIcon}
            name={`${iconPrefix}-${Activities.reading.icon}`}
            size={48}
            color={Colors.tabIconSelected}
          />
          <Text style={styles.activityTitle}>Books read:</Text>
        </View>
        <Text style={styles.activitySubText}>{`(${projectedBooksRead})`}</Text>
        <Text style={styles.activityTitle}>{`${booksRead} / 12`}</Text>
      </View>
      <ListSeparator />
      <View style={styles.item}>
        <View style={styles.activityLabel}>
          <Ionicons
            style={styles.activityIcon}
            name={`${iconPrefix}-${Activities.running.icon}`}
            size={48}
            color={Colors.tabIconSelected}
          />
          <Text style={styles.activityTitle}>Miles run:</Text>
        </View>
        <Text style={styles.activitySubText}>{`(${projectedMilesRun})`}</Text>
        <Text style={styles.activityTitle}>{`${milesRun} / 200`}</Text>
      </View>
      <ListSeparator />
      <View style={styles.item}>
        <View style={styles.activityLabel}>
          <Ionicons
            style={styles.activityIcon}
            name={`${iconPrefix}-${Activities.cycling.icon}`}
            size={48}
            color={Colors.tabIconSelected}
          />
          <Text style={styles.activityTitle}>Miles cycled:</Text>
        </View>
        <Text style={styles.activitySubText}>{`(${projectedMilesCycled})`}</Text>
        <Text style={styles.activityTitle}>{`${milesCycled} / 100`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flexBasis: 162,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  activitySubText: {
    padding: 16,
    fontSize: 18,
    color: Colors.gray,
    paddingRight: 0,
  },
  loadingContainer: {
    marginTop: 32,
  },
});
