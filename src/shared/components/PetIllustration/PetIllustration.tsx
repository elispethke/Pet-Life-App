import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';
import { colors } from '@/shared/theme';
import { styles } from './PetIllustration.styles';

type PetIllustrationProps = {
  style?: StyleProp<ViewStyle>;
};

// Cachorro e gato sobre um círculo lavanda. Vem de docs/assets/pet-illustration.svg,
// com as cores trocadas pelos tokens do tema. O tamanho segue a largura do container.
export function PetIllustration({ style }: PetIllustrationProps) {
  return (
    <View
      style={[styles.container, style]}
      accessible
      accessibilityRole="image"
      accessibilityLabel="Um cachorro e um gato"
    >
      <Svg width="100%" height="100%" viewBox="0 0 280 250">
        <Circle cx={140} cy={140} r={104} fill={colors.lavender} />

        {/* Gato (atrás do cachorro) */}
        <Path d="M160 138 L164 96 L186 124 Z" fill={colors.grape} />
        <Path d="M232 138 L228 96 L206 124 Z" fill={colors.grape} />
        <Path d="M167 124 L168 106 L180 121 Z" fill={colors.lavender} />
        <Path d="M225 124 L224 106 L212 121 Z" fill={colors.lavender} />
        <Ellipse cx={204} cy={240} rx={46} ry={30} fill={colors.grape} />
        <Ellipse cx={196} cy={160} rx={42} ry={38} fill={colors.grape} />
        <Ellipse cx={183} cy={156} rx={5.5} ry={7.5} fill={colors.mango} />
        <Ellipse cx={209} cy={156} rx={5.5} ry={7.5} fill={colors.mango} />
        <Ellipse cx={183} cy={157} rx={2} ry={5} fill={colors.deepPurple} />
        <Ellipse cx={209} cy={157} rx={2} ry={5} fill={colors.deepPurple} />
        <Path d="M192 168h8l-4 5z" fill={colors.illustrationPink} />
        <Path
          d="M196 173q-5 6-10 3M196 173q5 6 10 3"
          stroke={colors.lavender}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M154 166l-20-5M154 173l-20 5M238 166l20-5M238 173l20 5"
          stroke={colors.grape}
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {/* Cachorro */}
        <Ellipse cx={62} cy={130} rx={17} ry={36} rotation={14} origin="62, 130" fill={colors.grape} />
        <Ellipse cx={164} cy={130} rx={17} ry={36} rotation={-14} origin="164, 130" fill={colors.grape} />
        <Ellipse cx={113} cy={246} rx={62} ry={40} fill={colors.screen} />
        <Path d="M70 198Q113 216 156 198" stroke={colors.grape} strokeWidth={9} fill="none" strokeLinecap="round" />
        <Circle cx={113} cy={214} r={7} fill={colors.mango} stroke={colors.deepPurple} strokeWidth={2} />
        <Ellipse cx={113} cy={140} rx={54} ry={50} fill={colors.screen} />
        <Ellipse cx={113} cy={156} rx={28} ry={21} fill={colors.white} />
        <Circle cx={94} cy={132} r={6} fill={colors.deepPurple} />
        <Circle cx={132} cy={132} r={6} fill={colors.deepPurple} />
        <Circle cx={96} cy={130} r={1.8} fill={colors.white} />
        <Circle cx={134} cy={130} r={1.8} fill={colors.white} />
        <Ellipse cx={113} cy={174} rx={7} ry={8} fill={colors.illustrationPink} />
        <Ellipse cx={113} cy={150} rx={10} ry={7} fill={colors.deepPurple} />
        <Path
          d="M113 157v7M113 164q-8 8-17 2M113 164q8 8 17 2"
          stroke={colors.deepPurple}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
