import {useEffect} from 'react';
import {useAppSelector, useActions} from '@/redux/hooks';
import {selectTextSecondsSinceStartedTyping} from '@/redux/selectors/text';

const SECONDS_TO_TYPE = 15;

export function Timer() {
  const secondsSinceStartedTyping = useAppSelector(
      selectTextSecondsSinceStartedTyping,
  );
  const {finishTyping} = useActions();

  useEffect(() => {
    if (secondsSinceStartedTyping === SECONDS_TO_TYPE) {
      finishTyping();
    }
  }, [secondsSinceStartedTyping]);

  return (
    <div style={{alignSelf: 'flex-start'}}>
      {SECONDS_TO_TYPE - secondsSinceStartedTyping}
    </div>
  );
}
