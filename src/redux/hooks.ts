import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {
  fetchQuotes,
  actions as textActions,
} from '@/components/text/redux/textSlice';
import {actions as modalsActions} from '@/modals/modalsSlice';
import {fetchListOfQuotes} from '@/modals/modalsSlice';
import {RootState, AppDispatch} from '.';

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
