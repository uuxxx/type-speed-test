import {setupStore} from '@/redux';
import '@/styles/initial.scss';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './components/App';
import {ErrorBoundary} from './components/errorBoundary';
import {Fallback} from './components/fallback';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary fallback={<Fallback />}>
      <Provider store={setupStore()}>
        <App />
      </Provider>
    </ErrorBoundary>,
);
