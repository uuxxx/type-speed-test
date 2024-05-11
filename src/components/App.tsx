import {useAppSelector} from '@/redux/hooks';
import {selectModalsIsAnyModalOpened} from '@/redux/selectors/modals/modals';
import styles from '@/styles/app.module.scss';
import {RouterProvider} from 'react-router-dom';
import {router} from './router';

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
