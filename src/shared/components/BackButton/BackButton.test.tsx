import { fireEvent, render, screen } from '@testing-library/react-native';
import { BackButton } from './BackButton';

describe('BackButton', () => {
  it('é encontrado pelo rótulo de acessibilidade "Voltar"', async () => {
    await render(<BackButton onPress={jest.fn()} />);

    expect(screen.getByLabelText('Voltar')).toBeTruthy();
  });

  it('chama onPress ao tocar', async () => {
    const onPress = jest.fn();
    await render(<BackButton onPress={onPress} />);

    await fireEvent.press(screen.getByTestId('back-button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
