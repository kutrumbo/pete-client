import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { groupBy, map, uniqBy } from 'lodash';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const mapState = state => ({
  events: state.events,
});

const TrendsScreen = ({ events }) => {
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

export default connect(
  mapState,
  null
)(TrendsScreen);

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
