import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@/shared/components/Button';
import { Screen } from '@/shared/components/Screen';
import { TextField } from '@/shared/components/TextField';
import type { TextFieldRef } from '@/shared/components/TextField';
import { AuthFooterLink, AuthHeader } from '@/features/auth/components';
import { TermsCheckbox } from './components';
import { useSignupForm } from './useSignupForm';
import { styles } from './SignupScreen.styles';

// Tela Criar conta. A tela só compõe; a lógica está em useSignupForm.
export function SignupScreen() {
  const router = useRouter();
  const form = useSignupForm();
  const emailRef = useRef<TextFieldRef>(null);
  const passwordRef = useRef<TextFieldRef>(null);

  return (
    <Screen keyboardAware>
      <AuthHeader title="Crie sua conta" subtitle="Leva menos de um minuto." onBack={() => router.back()} />

      <View style={styles.form}>
        <TextField
          testID="signup-name"
          label="Nome"
          value={form.name}
          onChangeText={form.setName}
          error={form.errors.name}
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          editable={!form.loading}
        />
        <TextField
          testID="signup-email"
          label="E-mail"
          value={form.email}
          onChangeText={form.setEmail}
          error={form.errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          inputRef={emailRef}
          editable={!form.loading}
        />
        <TextField
          testID="signup-password"
          label="Senha"
          value={form.password}
          onChangeText={form.setPassword}
          error={form.errors.password}
          secure
          autoCapitalize="none"
          autoComplete="new-password"
          returnKeyType="done"
          inputRef={passwordRef}
          editable={!form.loading}
        />
        {!form.errors.password && <Text style={styles.hint}>Mínimo de 8 caracteres.</Text>}
        <TermsCheckbox
          testID="signup-terms"
          checked={form.acceptedTerms}
          onToggle={form.toggleTerms}
          error={form.errors.terms}
        />
        {form.submitError ? (
          <Text testID="signup-submit-error" accessibilityRole="alert" style={styles.submitError}>
            {form.submitError}
          </Text>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Button testID="signup-submit" label="Criar conta" onPress={form.submit} loading={form.loading} />
        <AuthFooterLink
          testID="signup-go-login"
          prompt="Já tem conta?"
          actionLabel="Entrar"
          onPress={() => router.replace('/login')}
        />
      </View>
    </Screen>
  );
}
