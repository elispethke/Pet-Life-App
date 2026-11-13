import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/shared/theme';
import { styles } from './TermsCheckbox.styles';

type TermsCheckboxProps = {
  checked: boolean;
  onToggle: () => void;
  error?: string;
  testID?: string;
};

// Aceite obrigatório dos Termos de Uso e da Política de Privacidade (LGPD e GDPR).
export function TermsCheckbox({ checked, onToggle, error, testID = 'terms-checkbox' }: TermsCheckboxProps) {
  const boxState = checked ? styles.boxState.checked : error ? styles.boxState.error : styles.boxState.unchecked;

  return (
    <View>
      <Pressable
        testID={testID}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel="Aceito os Termos de Uso e a Política de Privacidade"
        onPress={onToggle}
        style={styles.row}
      >
        <View style={[styles.box, boxState]}>
          {checked && (
            <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <Path d="M5 12.5l5 5 9-10" stroke={colors.white} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          )}
        </View>
        <Text style={styles.text}>Aceito os Termos de Uso e a Política de Privacidade.</Text>
      </Pressable>
      {error ? (
        <Text testID={`${testID}-error`} accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
