import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function TrendsScreen() {
  return (
    <ScrollView style={styles.container}>
       <Text>Trends</Text>
    </ScrollView>
  );
}

TrendsScreen.navigationOptions = {
  title: 'Trends',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
