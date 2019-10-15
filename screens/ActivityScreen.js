import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

export default function ActivityScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Activity</Text>
    </ScrollView>
  );
}

ActivityScreen.navigationOptions = {
  title: 'Activity',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
