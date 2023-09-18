import {useAppSelector} from '@/redux/hooks';
import {RouterProvider} from 'react-router-dom';
import {router} from './router';
import {selectModalsIsAnyModalOpened} from '@/redux/selectors/modals/modals';
import styles from '@styles/app.module.scss';

export function App() {
  const isAnyModalOpened = useAppSelector(selectModalsIsAnyModalOpened);
  return (
    <div
      className={`${styles.wrapper} ${
        isAnyModalOpened ? styles.modalOpened : ''
      }`}
    >
      <RouterProvider router={router} />
    </div>
  );
}
