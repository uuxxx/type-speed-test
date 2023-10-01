import React, {PropsWithChildren} from 'react';
import {PreloadedState} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import type {RenderOptions} from '@testing-library/react';
import {render} from '@testing-library/react';
import setupStore, {AppStore, RootState} from '..';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithReduxProvider(
    ui: React.ReactElement,
    {
      preloadedState = {},
      store = setupStore(preloadedState),
      ...renderOptions
    }: ExtendedRenderOptions = {},
) {
  function Wrapper({children}: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}

export function getReduxStateBoilerplate(obj: Partition<RootState> = {}) {
  const initialState: RootState = {
    text: {
      isLoading: false,
      errorWhileFetchingQuotes: null,
      isTypingFinished: false,
      isTypingStarted: false,
      correctKeysPressed: 0,
      totalKeysPressed: 0,
      afkDetected: false,
      mode: 'words',
      infoAboutText: {
        secondsSinceStartedTyping: 0,
        currentWordId: 0,
        words: [],
        length: 5,
        source: 'test test',
        language: 'english',
        wordsTyped: 0,
      },
    },
    modals: {
      isAnyModalOpened: false,
      selectLangModal: {
        isOpened: false,
        availableLangs: [],
        isListLoading: false,
        errorWhileLoading: null,
      },
    },
  };

  function changeField(
      toChange: Record<string, any> = initialState,
      changes: Record<string, any> = obj,
  ) {
    for (const key in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, key)) {
        if (typeof changes[key] !== 'object') {
          toChange[key] = changes[key];
          continue;
        }

        if (toChange[key] === undefined) {
          toChange[key] = Array.isArray(changes[key]) ? [] : {};
        }
        changeField(toChange[key], changes[key]);
      }
    }
  }

  changeField();
  return initialState;
}
