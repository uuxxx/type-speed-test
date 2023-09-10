import {useAppSelector} from '@/redux/hooks';
import {RouterProvider} from 'react-router-dom';
import {router} from './router';
import styles from '@styles/app.module.scss';

export function App() {
  const isAnyModalOpened = useAppSelector(
      (state) => state.modals.isAnyModalOpened,
  );
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
