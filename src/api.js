import { concat, without } from 'lodash';
import { API_URL } from 'react-native-dotenv';

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

export function stravaTokenExchange(code) {
  return fetch(`${API_URL}/strava/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
}
