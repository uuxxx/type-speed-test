import {useEffect} from 'react';
import {useAppSelector} from '@/redux/hooks';

export function useTheme() {
  const {name: themeName} = useAppSelector((state) => state.theme);

  useEffect(() => {
    document.querySelector('body')!.className = `theme-${themeName}`;
  }, [themeName]);
}
