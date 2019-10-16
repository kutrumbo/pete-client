import React from 'react';
import { connect } from 'react-redux';
import { FlatList, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { map } from 'lodash';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import { toggleActivity } from '../redux/ducks/activities';
import ListSeparator from '../components/ListSeparator';

const mapDispatch = { toggleActivity };
const mapState = state => ({
  // TODO: use selector for performance
  activities: map(state.activities, (value, id) => ({ id, ...value })),
});

function Item({ active, id, title, toggleActivity }) {
  const iconName = Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark';

  return (
    <TouchableWithoutFeedback onPress={() => toggleActivity({ id })}>
      <View style={styles.item}>
        <Text style={styles.itemLabel}>{title}</Text>
        {active && <Ionicons name={iconName} size={40} color={Colors.tabIconSelected} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const ActivityScreen = ({ activities, toggleActivity }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={({ item }) => <Item {...item} toggleActivity={toggleActivity} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ListSeparator}
      />
    </View>
  );
};

ActivityScreen.navigationOptions = {
  title: 'Activity',
};

export default connect(
  mapState,
  mapDispatch
)(ActivityScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Layout.statusBarHeight,
    backgroundColor: Colors.background,
  },
  item: {
    backgroundColor: Colors.background,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontSize: 18,
  },
});
