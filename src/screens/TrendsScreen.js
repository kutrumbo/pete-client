import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { filter, map } from 'lodash';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const mapState = state => ({
  // TODO: use selector for performance
  activities: map(state.activities, (value, id) => ({ id, ...value })),
});

const TrendsScreen = ({ activities }) => {
  const activeActivities = filter(activities, activity => activity.active);
  return (
    <View style={styles.container}>
      {activeActivities.map(activity => (
        <Text key={activity.id}>
          {activity.title} {activity.active}
        </Text>
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
});
