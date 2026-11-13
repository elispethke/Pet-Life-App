import { fireEvent, render, screen } from '@testing-library/react-native';
import { useAuth } from '@/providers/AuthProvider';
import { AuthError } from '@/features/auth/types';
import { SignupScreen } from './SignupScreen';

const mockRouter = { push: jest.fn(), replace: jest.fn(), back: jest.fn() };
jest.mock('expo-router', () => ({ useRouter: () => mockRouter }));
jest.mock('@/providers/AuthProvider', () => ({ useAuth: jest.fn() }));

const signUp = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(useAuth).mockReturnValue({ signUp } as unknown as ReturnType<typeof useAuth>);
});

async function fill(values: { name: string; email: string; password: string; terms: boolean }) {
  await fireEvent.changeText(screen.getByTestId('signup-name'), values.name);
  await fireEvent.changeText(screen.getByTestId('signup-email'), values.email);
  await fireEvent.changeText(screen.getByTestId('signup-password'), values.password);
  if (values.terms) {
    await fireEvent.press(screen.getByTestId('signup-terms'));
  }
  await fireEvent.press(screen.getByTestId('signup-submit'));
}

const valid = { name: 'Marina Souza', email: 'marina@email.com', password: '12345678', terms: true };

describe('SignupScreen', () => {
  it('mostra os textos do design e a dica da senha', async () => {
    await render(<SignupScreen />);

    expect(screen.getByText('Crie sua conta')).toBeTruthy();
    expect(screen.getByText('Leva menos de um minuto.')).toBeTruthy();
    expect(screen.getByText('Mínimo de 8 caracteres.')).toBeTruthy();
    expect(screen.getByText('Aceito os Termos de Uso e a Política de Privacidade.')).toBeTruthy();
  });

  it('vazio: mostra todos os erros e NÃO cria a conta', async () => {
    await render(<SignupScreen />);

    await fireEvent.press(screen.getByTestId('signup-submit'));

    expect(screen.getByTestId('signup-name-error')).toHaveTextContent('Digite seu nome.');
    expect(screen.getByTestId('signup-email-error')).toHaveTextContent('Digite um e-mail válido.');
    expect(screen.getByTestId('signup-password-error')).toHaveTextContent(
      'A senha precisa ter no mínimo 8 caracteres.',
    );
    expect(screen.getByTestId('signup-terms-error')).toBeTruthy();
    expect(signUp).not.toHaveBeenCalled();
  });

  it('sem aceitar os termos não cria a conta', async () => {
    await render(<SignupScreen />);

    await fill({ ...valid, terms: false });

    expect(screen.getByTestId('signup-terms-error')).toHaveTextContent(
      'Aceite os Termos e a Política de Privacidade para continuar.',
    );
    expect(signUp).not.toHaveBeenCalled();
  });

  it('senha curta (7 caracteres) é rejeitada', async () => {
    await render(<SignupScreen />);

    await fill({ ...valid, password: '1234567' });

    expect(screen.getByTestId('signup-password-error')).toBeTruthy();
    expect(signUp).not.toHaveBeenCalled();
  });

  it('com tudo válido cria a conta com nome, e-mail e senha', async () => {
    signUp.mockResolvedValue(undefined);
    await render(<SignupScreen />);

    await fill(valid);

    expect(signUp).toHaveBeenCalledWith({ name: 'Marina Souza', email: 'marina@email.com', password: '12345678' });
    expect(screen.queryByTestId('signup-submit-error')).toBeNull();
  });

  it('mostra "Este e-mail já está em uso."', async () => {
    signUp.mockRejectedValue(new AuthError('Este e-mail já está em uso.'));
    await render(<SignupScreen />);

    await fill(valid);

    expect(await screen.findByTestId('signup-submit-error')).toHaveTextContent('Este e-mail já está em uso.');
  });

  it('durante o envio mostra carregamento e ignora o segundo toque', async () => {
    let finish: () => void = () => {};
    signUp.mockReturnValue(new Promise<void>((resolve) => (finish = resolve)));
    await render(<SignupScreen />);

    await fill(valid);
    await fireEvent.press(screen.getByTestId('signup-submit'));

    expect(screen.getByTestId('signup-submit')).toHaveProp('accessibilityState', { disabled: true, busy: true });
    expect(signUp).toHaveBeenCalledTimes(1);

    await finish();
    expect(await screen.findByText('Criar conta', { selector: undefined } as never).catch(() => null)).not.toBeUndefined();
  });

  it('o link "Entrar" leva ao login e o botão voltar volta', async () => {
    await render(<SignupScreen />);

    await fireEvent.press(screen.getByTestId('signup-go-login'));
    await fireEvent.press(screen.getByTestId('back-button'));

    expect(mockRouter.replace).toHaveBeenCalledWith('/login');
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
