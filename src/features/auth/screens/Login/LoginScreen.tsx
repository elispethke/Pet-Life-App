import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { Button } from '@/shared/components/Button';
import { Screen } from '@/shared/components/Screen';
import { TextField } from '@/shared/components/TextField';
import type { TextFieldRef } from '@/shared/components/TextField';
import { AuthFooterLink, AuthHeader } from '@/features/auth/components';
import { useLoginForm } from './useLoginForm';
import { styles } from './LoginScreen.styles';

// Tela de Login com e-mail e senha. A tela só compõe; a lógica está em useLoginForm.
export function LoginScreen() {
  const router = useRouter();
  const form = useLoginForm();
  const passwordRef = useRef<TextFieldRef>(null);

  return (
    <Screen keyboardAware>
      <AuthHeader
        title="Que bom te ver de novo"
        subtitle="Entre para ver a carteirinha do seu pet."
        onBack={() => router.back()}
      />

      <View style={styles.form}>
        <TextField
          testID="login-email"
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
          editable={!form.loading}
        />
        <TextField
          testID="login-password"
          label="Senha"
          value={form.password}
          onChangeText={form.setPassword}
          error={form.errors.password}
          secure
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={form.submit}
          inputRef={passwordRef}
          editable={!form.loading}
        />
        {/* Sem ação nesta etapa (recuperar senha fica para depois). */}
        <Text testID="login-forgot" accessibilityRole="link" style={styles.forgot}>
          Esqueci a senha
        </Text>
        {form.submitError ? (
          <Text testID="login-submit-error" accessibilityRole="alert" style={styles.submitError}>
            {form.submitError}
          </Text>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Button testID="login-submit" label="Entrar" onPress={form.submit} loading={form.loading} />
        <AuthFooterLink
          testID="login-go-signup"
          prompt="Não tem conta?"
          actionLabel="Criar conta"
          onPress={() => router.replace('/signup')}
        />
      </View>
    </Screen>
  );
}
