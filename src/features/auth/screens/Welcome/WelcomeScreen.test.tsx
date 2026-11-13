import { fireEvent, render, screen } from '@testing-library/react-native';
import { WelcomeScreen } from './WelcomeScreen';

const mockRouter = { push: jest.fn(), replace: jest.fn(), back: jest.fn() };
jest.mock('expo-router', () => ({ useRouter: () => mockRouter }));

beforeEach(() => jest.clearAllMocks());

describe('WelcomeScreen', () => {
  it('mostra o título e o subtítulo da Abertura', async () => {
    await render(<WelcomeScreen />);

    expect(screen.getByText('A carteirinha do seu pet, sempre no bolso.')).toBeTruthy();
    expect(screen.getByText('Vacinas, lembretes e rotina em um só lugar.')).toBeTruthy();
  });

  it('Continuar leva ao Login', async () => {
    await render(<WelcomeScreen />);

    await fireEvent.press(screen.getByTestId('welcome-continue'));

    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
});
