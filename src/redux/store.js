import { configureStore } from 'redux-starter-kit';

import activitiesReducer from './ducks/activities';

const store = configureStore({
  reducer: {
    activities: activitiesReducer,
  },
});

export default store;
