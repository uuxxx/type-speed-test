import {
  fetchQuotes,
  actions as textActions,
} from '@/components/text/redux/textSlice';
import {
  fetchListOfQuotes,
  actions as modalsActions,
} from '@/modals/modalsSlice';
import {bindActionCreators} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '.';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useActions() {
  const dispatch = useAppDispatch();
  return bindActionCreators(
      {...textActions, fetchQuotes, ...modalsActions, fetchListOfQuotes},
      dispatch,
  );
}
