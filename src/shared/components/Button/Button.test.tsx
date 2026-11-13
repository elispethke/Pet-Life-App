import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('mostra o texto e chama onPress ao tocar', async () => {
    const onPress = jest.fn();
    await render(<Button label="Entrar" onPress={onPress} testID="submit" />);

    await fireEvent.press(screen.getByTestId('submit'));

    expect(screen.getByText('Entrar')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('durante o carregamento não chama onPress e se anuncia como ocupado', async () => {
    const onPress = jest.fn();
    await render(<Button label="Entrar" onPress={onPress} testID="submit" loading />);

    await fireEvent.press(screen.getByTestId('submit'));

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByTestId('submit')).toHaveProp('accessibilityState', { disabled: true, busy: true });
    expect(screen.queryByText('Entrar')).toBeNull();
  });

  it('desabilitado não chama onPress', async () => {
    const onPress = jest.fn();
    await render(<Button label="Entrar" onPress={onPress} testID="submit" disabled />);

    await fireEvent.press(screen.getByTestId('submit'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
