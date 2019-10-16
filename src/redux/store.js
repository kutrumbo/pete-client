import { configureStore } from 'redux-starter-kit';

import eventsReducer from './ducks/events';

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
