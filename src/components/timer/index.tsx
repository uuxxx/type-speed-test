import {useAppSelector, useActions} from '@/redux/hooks';
import {useEffect} from 'react';

const SECONDS_TO_TYPE = 15;

export function Timer() {
  const secondsSinceStartedTyping = useAppSelector(
      (state) => state.text.infoAboutText.secondsSinceStartedTyping,
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
