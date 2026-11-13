import { Text } from 'react-native';
import { styles } from './Logo.styles';

type LogoProps = {
  size?: 'md' | 'lg';
};

// "Pet" em roxo escuro e "Life" em roxo uva, no mesmo texto.
export function Logo({ size = 'lg' }: LogoProps) {
  return (
    <Text style={[styles.text, styles.size[size]]} accessibilityLabel="PetLife">
      Pet<Text style={styles.life}>Life</Text>
    </Text>
  );
}
