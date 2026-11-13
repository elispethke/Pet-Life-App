import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Screen.styles';

export type ScreenVariant = 'yellow' | 'light';

type ScreenProps = {
  variant?: ScreenVariant;
  // Para telas com formulário: sobe o conteúdo quando o teclado abre e permite rolar,
  // assim o teclado nunca cobre os campos.
  keyboardAware?: boolean;
  // Para telas com conteúdo que pode passar do tamanho da tela.
  scroll?: boolean;
  // Telas dentro das abas: a barra inferior já cuida da área segura de baixo.
  withTabBar?: boolean;
  children: ReactNode;
};

// Base de toda tela: aplica o fundo da variante e respeita as áreas seguras (notch, barra do sistema).
export function Screen({
  variant = 'light',
  keyboardAware = false,
  scroll = false,
  withTabBar = false,
  children,
}: ScreenProps) {
  const edges = withTabBar ? (['top', 'left', 'right'] as const) : (['top', 'left', 'right', 'bottom'] as const);
  const scrollable = keyboardAware || scroll;

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    children
  );

  return (
    <SafeAreaView edges={edges} style={[styles.container, styles.variant[variant]]}>
      {keyboardAware ? (
        <KeyboardAvoidingView style={styles.keyboardArea} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
