import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const mapState = state => ({
  events: state.events,
});

const TrendsScreen = ({ events }) => {
  return (
    <View style={styles.container}>
      {events.map(event => (
        <Text key={event.id}>{event.activityId}</Text>
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
