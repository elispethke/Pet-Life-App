import * as SecureStore from 'expo-secure-store';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

// Os tokens ficam no armazenamento SEGURO do aparelho (Keychain no iOS, Keystore no Android),
// criptografado e isolado do app. Nunca em AsyncStorage nem em texto solto.
const ACCESS_KEY = 'petlife.accessToken';
const REFRESH_KEY = 'petlife.refreshToken';
// Só legível com o aparelho desbloqueado e que não vai para backup em outro aparelho.
const OPTIONS = { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY };

export async function saveTokens(tokens: Tokens): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_KEY, tokens.accessToken, OPTIONS);
  await SecureStore.setItemAsync(REFRESH_KEY, tokens.refreshToken, OPTIONS);
}

export async function readTokens(): Promise<Tokens | null> {
  const [accessToken, refreshToken] = await Promise.all([
    SecureStore.getItemAsync(ACCESS_KEY, OPTIONS),
    SecureStore.getItemAsync(REFRESH_KEY, OPTIONS),
  ]);
  return accessToken && refreshToken ? { accessToken, refreshToken } : null;
}

export async function clearTokens(): Promise<void> {
  await Promise.all([SecureStore.deleteItemAsync(ACCESS_KEY, OPTIONS), SecureStore.deleteItemAsync(REFRESH_KEY, OPTIONS)]);
}
