import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/react-hooks';

import Colors from '../constants/Colors';
import { camelCaseObject, iconPrefix } from '../utils';

import { FETCH_BOOKS_READ } from '../gql';
import ListSeparator from '../components/ListSeparator';

const GoalsScreen = () => {
  const { loading, error, data } = useQuery(FETCH_BOOKS_READ);

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

  const booksRead = camelCaseObject(data).eventsAggregate.aggregate.count;

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
        <Text style={styles.activityTitle}>0 / 200</Text>
      </View>
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
