import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Activities from '../constants/Activities';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const mapState = state => ({
  events: state.events,
});

const TrendsScreen = ({ events }) => {
  const iconPrefix = Platform.OS === 'ios' ? 'ios' : 'md';
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {events.map(event => (
          <Ionicons
            style={styles.activityIcon}
            key={event.activityId}
            name={`${iconPrefix}-${Activities[event.activityId].icon}`}
            size={48}
            color={Colors.tabIconSelected}
          />
        ))}
      </View>
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
