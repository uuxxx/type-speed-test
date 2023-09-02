import {configureStore} from '@reduxjs/toolkit';
import textReducer from '@components/text/redux/textSlice';
import modalsReducer from '@modals/modalsSlice';

const store = configureStore({
  reducer: {
    text: textReducer,
    modals: modalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
