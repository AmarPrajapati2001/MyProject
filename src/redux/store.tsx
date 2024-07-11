import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import songsReducer from './songsSlice';
import searchReducer from './searchSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import filterReducer from './filterSlice';
import playListReducer from './playListSlice';
import urlSlice from './urlSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Add the key(s) you want to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    songs: songsReducer,
    search: searchReducer,
    filter: filterReducer,
    playList: playListReducer,
    imageUrl: urlSlice,
    // Add other reducers here
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
