import { fireEvent, render, screen } from '@testing-library/react-native';
import { useAuth } from '@/providers/AuthProvider';
import { AuthError } from '@/features/auth/types';
import { LoginScreen } from './LoginScreen';

const mockRouter = { push: jest.fn(), replace: jest.fn(), back: jest.fn() };
jest.mock('expo-router', () => ({ useRouter: () => mockRouter }));
jest.mock('@/providers/AuthProvider', () => ({ useAuth: jest.fn() }));

const signIn = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(useAuth).mockReturnValue({ signIn } as unknown as ReturnType<typeof useAuth>);
});

async function fillAndSubmit(email: string, password: string) {
  await fireEvent.changeText(screen.getByTestId('login-email'), email);
  await fireEvent.changeText(screen.getByTestId('login-password'), password);
  await fireEvent.press(screen.getByTestId('login-submit'));
}

describe('LoginScreen', () => {
  it('mostra os textos do design', async () => {
    await render(<LoginScreen />);

    expect(screen.getByText('Que bom te ver de novo')).toBeTruthy();
    expect(screen.getByText('Entre para ver a carteirinha do seu pet.')).toBeTruthy();
    expect(screen.getByText('Esqueci a senha')).toBeTruthy();
  });

  it('com campos vazios mostra os erros e NÃO chama o login', async () => {
    await render(<LoginScreen />);

    await fireEvent.press(screen.getByTestId('login-submit'));

    expect(screen.getByTestId('login-email-error')).toHaveTextContent('Digite um e-mail válido.');
    expect(screen.getByTestId('login-password-error')).toHaveTextContent('Digite sua senha.');
    expect(signIn).not.toHaveBeenCalled();
  });

  it('com e-mail inválido mostra erro só no e-mail', async () => {
    await render(<LoginScreen />);

    await fillAndSubmit('marina', '12345678');

    expect(screen.getByTestId('login-email-error')).toBeTruthy();
    expect(screen.queryByTestId('login-password-error')).toBeNull();
    expect(signIn).not.toHaveBeenCalled();
  });

  it('com dados válidos chama o login com e-mail e senha digitados', async () => {
    signIn.mockResolvedValue(undefined);
    await render(<LoginScreen />);

    await fillAndSubmit('marina@email.com', '12345678');

    expect(signIn).toHaveBeenCalledWith({ email: 'marina@email.com', password: '12345678' });
    expect(screen.queryByTestId('login-submit-error')).toBeNull();
  });

  it('mostra a mensagem de credencial incorreta em português', async () => {
    signIn.mockRejectedValue(new AuthError('E-mail ou senha incorretos.'));
    await render(<LoginScreen />);

    await fillAndSubmit('marina@email.com', 'errada123');

    expect(await screen.findByTestId('login-submit-error')).toHaveTextContent('E-mail ou senha incorretos.');
  });

  it('erro inesperado vira mensagem genérica, sem detalhes internos', async () => {
    signIn.mockRejectedValue(new Error('stack trace secreto'));
    await render(<LoginScreen />);

    await fillAndSubmit('marina@email.com', '12345678');

    const message = await screen.findByTestId('login-submit-error');
    expect(message).toHaveTextContent('Não foi possível concluir. Tente novamente.');
    expect(message).not.toHaveTextContent('secreto');
  });

  it('durante o envio mostra carregamento e ignora o segundo toque', async () => {
    let finish: () => void = () => {};
    signIn.mockReturnValue(new Promise<void>((resolve) => (finish = resolve)));
    await render(<LoginScreen />);

    await fillAndSubmit('marina@email.com', '12345678');
    await fireEvent.press(screen.getByTestId('login-submit'));

    expect(screen.getByTestId('login-submit')).toHaveProp('accessibilityState', { disabled: true, busy: true });
    expect(signIn).toHaveBeenCalledTimes(1);

    await finish();
    expect(await screen.findByText('Entrar')).toBeTruthy();
  });

  it('digitar no campo apaga o erro dele', async () => {
    await render(<LoginScreen />);
    await fireEvent.press(screen.getByTestId('login-submit'));
    expect(screen.getByTestId('login-email-error')).toBeTruthy();

    await fireEvent.changeText(screen.getByTestId('login-email'), 'm');

    expect(screen.queryByTestId('login-email-error')).toBeNull();
  });

  it('o link "Criar conta" leva à tela de cadastro e o botão voltar volta', async () => {
    await render(<LoginScreen />);

    await fireEvent.press(screen.getByTestId('login-go-signup'));
    await fireEvent.press(screen.getByTestId('back-button'));

    expect(mockRouter.replace).toHaveBeenCalledWith('/signup');
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
