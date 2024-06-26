import textReducer from '@/components/text/redux/textSlice';
import modalsReducer from '@/modals/modalsSlice';
import {
  PreloadedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  text: textReducer,
  modals: modalsReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
