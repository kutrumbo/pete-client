import { createSlice } from 'redux-starter-kit';

import Activities from '../../constants/Activities';

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: Activities,
  reducers: {
    toggleActivity(state, action) {
      const activity = state[action.payload.id];
      activity.active = !activity.active;
    },
  },
});

const { actions, reducer } = activitiesSlice;
export const { toggleActivity } = actions;
export default reducer;
