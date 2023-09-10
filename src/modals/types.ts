export interface InitialState {
  isAnyModalOpened: boolean;
  selectLangModal: SelectLangModal;
}

export interface Modal {
  isOpened: boolean;
}

export interface SelectLangModal extends Modal {
  availableLangs: string[];
  isListLoading: boolean;
  errorWhileLoading: null | string;
}
