import { StyleSheet } from 'react-native';

// Mesma proporção do viewBox do desenho (280 por 250), para ele escalar sem distorcer.
export const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 280 / 250,
  },
});
