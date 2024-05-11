import {Game} from '@/pages/Game';
import {NotFound} from '@/pages/NotFound';
import {Analytics} from '@/pages/analytics/Analytics';
import {createBrowserRouter} from 'react-router-dom';

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
