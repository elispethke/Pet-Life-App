import { act, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import * as authApi from '@/features/auth/api/auth.api';
import type { AuthUser } from '@/features/auth/types';
import { AuthProvider, useAuth } from './AuthProvider';

jest.mock('@/features/auth/api/auth.api');

const api = jest.mocked(authApi);
const marina: AuthUser = { id: 'u1', email: 'marina@email.com', displayName: 'Marina' };

let emit: (user: AuthUser | null) => void;
const unsubscribe = jest.fn();

function Probe() {
  const { status, user, signIn, signUp, signOut } = useAuth();
  return (
    <>
      <Text testID="status">{status}</Text>
      <Text testID="user">{user?.email ?? 'nenhum'}</Text>
      <Text testID="name">{user?.displayName ?? 'sem nome'}</Text>
      <Text testID="sign-in" onPress={() => signIn({ email: 'marina@email.com', password: '12345678' })} />
      <Text testID="sign-up" onPress={() => signUp({ name: 'Marina', email: 'marina@email.com', password: '12345678' })} />
      <Text testID="sign-out" onPress={() => signOut()} />
    </>
  );
}

async function renderProvider() {
  await render(
    <AuthProvider>
      <Probe />
    </AuthProvider>,
  );
}

beforeEach(() => {
  jest.resetAllMocks();
  api.observeAuthState.mockImplementation((callback) => {
    emit = callback;
    return unsubscribe;
  });
});

describe('AuthProvider', () => {
  it('começa em "loading" até a sessão ser restaurada', async () => {
    await renderProvider();

    expect(screen.getByTestId('status')).toHaveTextContent('loading');
  });

  it('fica "signedOut" quando não há sessão salva', async () => {
    await renderProvider();

    await act(async () => emit(null));

    expect(screen.getByTestId('status')).toHaveTextContent('signedOut');
    expect(screen.getByTestId('user')).toHaveTextContent('nenhum');
  });

  it('fica "signedIn" quando a sessão salva é restaurada', async () => {
    await renderProvider();

    await act(async () => emit(marina));

    expect(screen.getByTestId('status')).toHaveTextContent('signedIn');
    expect(screen.getByTestId('user')).toHaveTextContent('marina@email.com');
  });

  it('signIn chama a api e guarda o usuário', async () => {
    api.signInWithEmail.mockResolvedValue(marina);
    await renderProvider();

    await act(async () => screen.getByTestId('sign-in').props.onPress());

    expect(api.signInWithEmail).toHaveBeenCalledWith({ email: 'marina@email.com', password: '12345678' });
    expect(screen.getByTestId('user')).toHaveTextContent('marina@email.com');
  });

  it('signUp guarda o usuário já com o nome', async () => {
    api.signUpWithEmail.mockResolvedValue(marina);
    await renderProvider();

    await act(async () => screen.getByTestId('sign-up').props.onPress());

    expect(screen.getByTestId('name')).toHaveTextContent('Marina');
  });

  it('signOut chama a api; o estado muda quando o observador avisa', async () => {
    api.signOut.mockResolvedValue(undefined);
    await renderProvider();
    await act(async () => emit(marina));

    await act(async () => screen.getByTestId('sign-out').props.onPress());
    await act(async () => emit(null));

    expect(api.signOut).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('status')).toHaveTextContent('signedOut');
  });

  it('para de observar a sessão ao desmontar', async () => {
    const { unmount } = await render(
      <AuthProvider>
        <Probe />
      </AuthProvider>,
    );

    await unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('useAuth fora do provider lança erro claro', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(render(<Probe />)).rejects.toThrow('useAuth deve ser usado dentro de <AuthProvider>.');

    spy.mockRestore();
  });
});
