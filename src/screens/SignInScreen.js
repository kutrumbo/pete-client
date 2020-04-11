import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';

import { stravaSignIn } from '../api';
import Colors from '../constants/Colors';

export default function SignInScreen({ route }) {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Strava"
        onPress={() => {
          stravaSignIn(setLoading, route.params.setSignedIn);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  loadingContainer: {
    marginTop: 32,
  },
});
