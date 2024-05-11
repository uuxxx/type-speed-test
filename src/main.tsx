import {setupStore} from '@/redux';
import '@/styles/initial.scss';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './components/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={setupStore()}>
      <App />
    </Provider>,
);
