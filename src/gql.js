import { gql } from 'apollo-boost';

export const INSERT_EVENT = gql`
  mutation insertEvent($id: uuid!, $activityId: String!, $date: date!) {
    insert_events(objects: [{ id: $id, activity_id: $activityId, date: $date }]) {
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

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: uuid!) {
    delete_events(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
