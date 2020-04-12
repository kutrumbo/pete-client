import { Ionicons } from '@expo/vector-icons';
import { filter, sumBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { fetchEvents } from '../api';
import ListSeparator from '../components/ListSeparator';
import Colors from '../constants/Colors';
import { iconPrefix } from '../utils';

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

  const booksRead = filter(events, event => event.name === 'reading').length;
  const runsThisYear = filter(events, event => {
    return event.name === 'running' && new Date(event.time) > new Date('2020-01-01');
  });
  const milesRun = Math.round(sumBy(runsThisYear, event => event.details.distance) * 0.000621371);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.activityLabel}>
          <Ionicons
            style={styles.activityIcon}
            name={`${iconPrefix}-book`}
            size={48}
            color={Colors.tabIconSelected}
          />
          <Text style={styles.activityTitle}>Books read:</Text>
        </View>
        <Text style={styles.activityTitle}>{`${booksRead} / 12`}</Text>
      </View>
      <ListSeparator />
      <View style={styles.item}>
        <View style={styles.activityLabel}>
          <Ionicons
            style={styles.activityIcon}
            name={`${iconPrefix}-walk`}
            size={48}
            color={Colors.tabIconSelected}
          />
          <Text style={styles.activityTitle}>Miles run:</Text>
        </View>
        <Text style={styles.activityTitle}>{`${milesRun} / 200`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flexBasis: 108,
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
  loadingContainer: {
    marginTop: 32,
  },
});
