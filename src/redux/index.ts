import {configureStore} from '@reduxjs/toolkit';
import textReducer from '@components/text/redux/textSlice';
import themeReducer from './theme_slice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    text: textReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
