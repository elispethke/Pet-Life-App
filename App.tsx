import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { colors, fontFamily, fontsToLoad, fontSize } from './src/shared/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontsError] = useFonts(fontsToLoad);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  // Placeholder temporário só para conferir cores e fontes. Será substituído pelas telas.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetLife</Text>
      <Text style={styles.subtitle}>A carteirinha do seu pet, sempre no bolso.</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screen,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.display,
    color: colors.grape,
  },
  subtitle: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});
