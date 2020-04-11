import { AuthSession } from 'expo';
import { concat, without } from 'lodash';
import { API_URL, STRAVA_CLIENT_ID } from 'react-native-dotenv';

import { setToken } from './storage';

export async function fetchEvents(setState) {
  fetch(`${API_URL}/events`)
    .then(response => response.json())
    .then(events => {
      setState([false, false, events]);
    })
    .catch(error => {
      setState([false, error, []]);
    });
}

export async function createEvent(event, events, setState) {
  setState([true, false, events]);
  fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ event }),
  })
    .then(response => response.json())
    .then(json => {
      setState([false, false, concat(events, event)]);
    })
    .catch(error => {
      setState([false, error, events]);
    });
}

export async function deleteEvent(event, events, setState) {
  setState([true, false, events]);
  fetch(`${API_URL}/events/${event.id}`, {
    method: 'DELETE',
  })
    .then(response => {
      setState([false, false, without(events, event)]);
    })
    .catch(error => {
      setState([false, error, events]);
    });
}

function stravaTokenExchange(code) {
  return fetch(`${API_URL}/strava/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
}

export async function stravaSignIn(setLoading, setSignedIn) {
  setLoading(true);
  let redirectUrl = AuthSession.getRedirectUrl();
  let authResult = await AuthSession.startAsync({
    authUrl:
      `https://www.strava.com/oauth/authorize?` +
      `&client_id=${STRAVA_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&response_type=code` +
      `&scope=activity:read_all`,
  });
  if (authResult.errorCode) {
    setLoading(false);
    console.error(`Strava Auth Error: ${authResult}`);
  } else {
    const tokenResult = await stravaTokenExchange(authResult.params.code);
    if (tokenResult.status === 200) {
      const json = await tokenResult.json();
      setToken(json['access_token']);
      setSignedIn(true);
    } else {
      setLoading(false);
      console.error(`Strava Token Error: ${await tokenResult.json()}`);
    }
  }
}
