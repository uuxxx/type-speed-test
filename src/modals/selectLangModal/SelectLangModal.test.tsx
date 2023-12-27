import {
  getReduxStateBoilerplate,
  renderWithReduxProvider,
} from '@/redux/test/utils';
import '@testing-library/jest-dom';
import {SelectLangModal} from '.';

describe('<SelectLang>', () => {
  it('renders correctly', () => {
    const popups = document.createElement('div');
    popups.id = 'popups';
    document.body.appendChild(popups);
    const {queryByTestId} = renderWithReduxProvider(<SelectLangModal />, {
      preloadedState: getReduxStateBoilerplate({
        modals: {
          isAnyModalOpened: true,
          selectLangModal: {
            isOpened: true,
          },
        },
      }),
    });

    const modal = queryByTestId('select-lang-modal');
    const overlay = queryByTestId('overlay');
    expect(modal).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
  });
});
