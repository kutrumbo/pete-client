import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { STRAVA_CLIENT_ID } from 'react-native-dotenv';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { stravaTokenExchange } from '../api';
import Colors from '../constants/Colors';
import { setToken } from '../storage';

const STRAVA_ENDPOINTS = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen({ route }) {

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: STRAVA_CLIENT_ID,
      scopes: ['activity:read_all'],
      redirectUri: makeRedirectUri({
        // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
        native: 'peteapp://redirect',
      }),
    },
    STRAVA_ENDPOINTS,
  );

  useEffect(() => {
    async function signIn(code) {
      setToken(await stravaTokenExchange(code));
      route.params.setSignedIn();
    }
    if (response?.type === 'success') {
      signIn(response.params.code);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Sign into Strava"
        onPress={() => { promptAsync() }}
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
