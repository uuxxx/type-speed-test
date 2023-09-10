import {createBrowserRouter} from 'react-router-dom';
import {Game} from '@/pages/Game';
import {NotFound} from '@/pages/NotFound';
import {Analytics} from '@/pages/analytics/Analytics';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Game />,
    errorElement: <NotFound />,
  },
  {
    path: '/analytics',
    element: <Analytics />,
  },
]);
