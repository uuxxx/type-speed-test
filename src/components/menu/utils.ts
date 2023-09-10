import {LAST_SELECTED_MODE} from '@/constants';

export function getLastSelectedModeFromLocalStorage(): Mode {
  const lastSelectedMode = localStorage.getItem(LAST_SELECTED_MODE);
  if (lastSelectedMode) {
    return lastSelectedMode as Mode;
  }

  localStorage.setItem(LAST_SELECTED_MODE, 'words');
  return 'words';
}

export function setSelectedModeToLocalStorage(mode: Mode) {
  localStorage.setItem(LAST_SELECTED_MODE, mode);
}
