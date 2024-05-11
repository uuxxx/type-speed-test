import {LIST_OF_CONTROL_KEYS} from '@/constants';
import {
  getReduxStateBoilerplate,
  renderWithReduxProvider,
} from '@/redux/test/utils';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Words} from '.';
import {serialize} from '../text/redux/utils';

describe('<Words />', () => {
  window.HTMLElement.prototype.scrollIntoView = function() {};
  const user = userEvent.setup();

  it('renders correctly', () => {
    renderWithReduxProvider(<Words />, {
      preloadedState: getReduxStateBoilerplate({
        text: {
          infoAboutText: {
            words: serialize('test, text!'),
            length: 2,
          },
        },
      }),
    });

    const words = screen.getAllByTestId('word');
    expect(words).toMatchSnapshot();
  });

  it('start typing with correct letter', async () => {
    renderWithReduxProvider(<Words />, {
      preloadedState: getReduxStateBoilerplate({
        text: {
          infoAboutText: {
            words: serialize('test, text!'),
            length: 2,
          },
        },
      }),
    });

    await user.keyboard('{t}');
    const words = screen.getAllByTestId('word');
    expect(words).toMatchSnapshot();
  });

  it('start typing with incorrect letter', async () => {
    renderWithReduxProvider(<Words />, {
      preloadedState: getReduxStateBoilerplate({
        text: {
          infoAboutText: {
            words: serialize('test, text!'),
            length: 2,
          },
        },
      }),
    });

    await user.keyboard('{z}');
    const words = screen.getAllByTestId('word');
    expect(words).toMatchSnapshot();
  });

  it('reject control keypresses', async () => {
    renderWithReduxProvider(<Words />, {
      preloadedState: getReduxStateBoilerplate({
        text: {
          infoAboutText: {
            words: serialize('test, text!'),
            length: 2,
          },
        },
      }),
    });

    await new Promise<void>((r) => {
      let resolvedCounter = 0;
      for (const key of LIST_OF_CONTROL_KEYS) {
        user.keyboard(`[${key}]`).then(() => {
          resolvedCounter++;
          if (resolvedCounter === LIST_OF_CONTROL_KEYS.length) {
            r();
          }
        });
      }
    });
    const words = screen.getAllByTestId('word');
    expect(words).toMatchSnapshot();
  });

  describe('backspace shouldnt work', () => {
    it('current word id is 0, cur letter id is 0', async () => {
      renderWithReduxProvider(<Words />, {
        preloadedState: getReduxStateBoilerplate({
          text: {
            infoAboutText: {
              words: serialize('test, text!'),
              length: 2,
            },
          },
        }),
      });

      await user.keyboard('[Backspace]');
      await user.keyboard('[ControlLeft]>[Backspace]');
      const words = screen.getAllByTestId('word');
      expect(words).toMatchSnapshot();
    });

    it('prev word typed correctly', async () => {
      const configuredWords = serialize('test, text!');
      configuredWords[0].type = 'correct';

      renderWithReduxProvider(<Words />, {
        preloadedState: getReduxStateBoilerplate({
          text: {
            infoAboutText: {
              words: configuredWords,
              length: 2,
              currentWordId: 1,
            },
          },
        }),
      });

      await user.keyboard('[Backspace]');
      await user.keyboard('[ControlLeft]>[Backspace]');
      const words = screen.getAllByTestId('word');
      expect(words).toMatchSnapshot();
    });
  });

  describe('backspace should work', () => {
    it('currentLetter is 1', async () => {
      const configuredWords = serialize('test, text!');
      configuredWords[0].currentLetterId = 1;

      renderWithReduxProvider(<Words />, {
        preloadedState: getReduxStateBoilerplate({
          text: {
            infoAboutText: {
              words: configuredWords,
              length: 2,
              currentWordId: 0,
            },
          },
        }),
      });

      await user.keyboard('[Backspace]');
      const words = screen.getAllByTestId('word');
      expect(words).toMatchSnapshot();
    });

    it('pressed backspace + ctrl', async () => {
      const configuredWords = serialize('test, text!');
      configuredWords[0].currentLetterId = 3;

      renderWithReduxProvider(<Words />, {
        preloadedState: getReduxStateBoilerplate({
          text: {
            infoAboutText: {
              words: configuredWords,
              length: 2,
              currentWordId: 0,
            },
          },
        }),
      });

      await user.keyboard('[ControlLeft]>[Backspace]');
      const words = screen.getAllByTestId('word');
      expect(words).toMatchSnapshot();
    });

    it('return to prev word', async () => {
      const configuredWords = serialize('test, text!');
      configuredWords[0].type = 'incorrect';
      configuredWords[1].currentLetterId = 0;

      renderWithReduxProvider(<Words />, {
        preloadedState: getReduxStateBoilerplate({
          text: {
            infoAboutText: {
              words: configuredWords,
              length: 2,
              currentWordId: 1,
            },
          },
        }),
      });

      await user.keyboard('[Backspace]');
      const words = screen.getAllByTestId('word');
      expect(words).toMatchSnapshot();
    });
  });
});
