import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const middleWares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(reduxLogger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))

  // applyMiddleware(...middleware)
);

export const persistor = persistStore(store);
