import { fireEvent, render, screen } from '@testing-library/react-native';
import { TermsCheckbox } from './TermsCheckbox';

describe('TermsCheckbox', () => {
  it('mostra o texto do aceite e começa desmarcado', async () => {
    await render(<TermsCheckbox checked={false} onToggle={jest.fn()} />);

    expect(screen.getByText('Aceito os Termos de Uso e a Política de Privacidade.')).toBeTruthy();
    expect(screen.getByRole('checkbox')).toHaveProp('accessibilityState', { checked: false });
  });

  it('reflete o estado marcado', async () => {
    await render(<TermsCheckbox checked onToggle={jest.fn()} />);

    expect(screen.getByRole('checkbox')).toHaveProp('accessibilityState', { checked: true });
  });

  it('chama onToggle ao tocar', async () => {
    const onToggle = jest.fn();
    await render(<TermsCheckbox checked={false} onToggle={onToggle} />);

    await fireEvent.press(screen.getByTestId('terms-checkbox'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('mostra a mensagem de erro quando há erro', async () => {
    await render(<TermsCheckbox checked={false} onToggle={jest.fn()} error="Aceite os termos para continuar." />);

    expect(screen.getByTestId('terms-checkbox-error')).toHaveTextContent('Aceite os termos para continuar.');
  });
});
