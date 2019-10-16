import { createSlice } from 'redux-starter-kit';

import uuid from 'uuid/v4';
import { find, pull } from 'lodash';

const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    toggleActivity(state, action) {
      const { activityId, date } = action.payload;
      const match = find(state, event => event.activityId === activityId && event.date === date);
      if (match) {
        pull(state, match);
      } else {
        state.push({ activityId, date, id: uuid() });
      }
    },
  },
});

const { actions, reducer } = eventsSlice;
export const { toggleActivity } = actions;
export default reducer;
