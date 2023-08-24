import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {actions as themeActions} from './theme_slice';
import {
  fetchQuotes,
  actions as textActions,
} from '@/components/text/redux/textSlice';
import {RootState, AppDispatch} from '.';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useActions() {
  const dispatch = useAppDispatch();
  return bindActionCreators(
      {...themeActions, ...textActions, fetchQuotes},
      dispatch,
  );
}
