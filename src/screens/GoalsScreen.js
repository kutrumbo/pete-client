import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const GoalsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Goal</Text>
    </View>
  );
};

GoalsScreen.navigationOptions = {
  title: 'Goals',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: Colors.tintColor,
  },
};

export default GoalsScreen;

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
  loadingContainer: {
    marginTop: 32,
  },
});
