import { gql } from 'apollo-boost';

export const INSERT_EVENT = gql`
  mutation insert_events($events: [events_insert_input!]!) {
    insert_events(objects: $events) {
      returning {
        id
        activity_id
        date
      }
    }
  }
`;

export const FETCH_EVENTS = gql`
  {
    events {
      id
      activity_id
      date
    }
  }
`;
