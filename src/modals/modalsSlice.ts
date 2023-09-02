import {createSlice} from '@reduxjs/toolkit';
import {InitialState, Modal} from './types';

const initialState = {
  isAnyModalOpened: false,
  selectLangModal: {
    isOpened: false,
  },
} as InitialState;

function ifAnyModalOpened(state: InitialState) {
  for (const key in state) {
    if (key === 'isAnyModalOpened') {
      continue;
    }

    const modal = <Modal>state[key as keyof InitialState];

    if (modal.isOpened) {
      return true;
    }
  }
  return false;
}

const slice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openSelectLangModal(state) {
      if (state.isAnyModalOpened) {
        return;
      }
      const {selectLangModal} = state;
      state.isAnyModalOpened = true;
      selectLangModal.isOpened = true;
    },
    closeSelectLangModal(state) {
      state.selectLangModal.isOpened = false;
      state.isAnyModalOpened = ifAnyModalOpened(state);
    },
  },
});

export default slice.reducer;
export const {actions} = slice;
