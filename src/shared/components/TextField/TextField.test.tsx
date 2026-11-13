import { fireEvent, render, screen } from '@testing-library/react-native';
import { TextField } from './TextField';

describe('TextField', () => {
  it('mostra o rótulo e o valor', async () => {
    await render(<TextField label="E-mail" value="marina@email.com" onChangeText={jest.fn()} testID="email" />);

    expect(screen.getByText('E-mail')).toBeTruthy();
    expect(screen.getByTestId('email').props.value).toBe('marina@email.com');
  });

  it('chama onChangeText ao digitar', async () => {
    const onChangeText = jest.fn();
    await render(<TextField label="Nome" value="" onChangeText={onChangeText} testID="name" />);

    await fireEvent.changeText(screen.getByTestId('name'), 'Marina');

    expect(onChangeText).toHaveBeenCalledWith('Marina');
  });

  it('mostra a mensagem de erro quando há erro e não mostra quando não há', async () => {
    const { rerender } = await render(
      <TextField label="E-mail" value="" onChangeText={jest.fn()} testID="email" />,
    );
    expect(screen.queryByTestId('email-error')).toBeNull();

    await rerender(<TextField label="E-mail" value="" onChangeText={jest.fn()} testID="email" error="E-mail inválido." />);
    expect(screen.getByTestId('email-error')).toHaveTextContent('E-mail inválido.');
  });

  it('não mostra o botão de olho em campo comum', async () => {
    await render(<TextField label="E-mail" value="" onChangeText={jest.fn()} testID="email" />);

    expect(screen.queryByTestId('email-toggle')).toBeNull();
    expect(screen.getByTestId('email').props.secureTextEntry).toBe(false);
  });

  it('esconde a senha por padrão e alterna ao tocar no olho', async () => {
    await render(<TextField label="Senha" value="12345678" onChangeText={jest.fn()} testID="password" secure />);

    expect(screen.getByTestId('password').props.secureTextEntry).toBe(true);
    expect(screen.getByLabelText('Mostrar senha')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('password-toggle'));
    expect(screen.getByTestId('password').props.secureTextEntry).toBe(false);
    expect(screen.getByLabelText('Ocultar senha')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('password-toggle'));
    expect(screen.getByTestId('password').props.secureTextEntry).toBe(true);
  });
});
