import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Screen } from './Screen';

describe('Screen', () => {
  it('mostra o conteúdo', async () => {
    await render(
      <Screen>
        <Text>conteúdo</Text>
      </Screen>,
    );

    expect(screen.getByText('conteúdo')).toBeTruthy();
  });

  it('mostra o conteúdo também no modo com teclado', async () => {
    await render(
      <Screen variant="yellow" keyboardAware>
        <Text>formulário</Text>
      </Screen>,
    );

    expect(screen.getByText('formulário')).toBeTruthy();
  });
});
