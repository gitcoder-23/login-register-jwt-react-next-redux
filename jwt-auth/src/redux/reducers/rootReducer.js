import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../reducers/reducers';

const persistConfig = {
  key: 'rootPersist',
  storage,
  // which reducer do you want to persist
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default persistReducer(persistConfig, rootReducer);
