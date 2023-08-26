import {useAppSelector} from '@/redux/hooks';

export function TypedWordsCounter() {
  const {wordsTyped, length: textLength} = useAppSelector(
      (state) => state.text.infoAboutText,
  );

  return <div>{`${wordsTyped}/${textLength}`}</div>;
}
