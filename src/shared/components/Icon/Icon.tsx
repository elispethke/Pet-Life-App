import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/shared/theme';

export type IconName = 'home' | 'card' | 'scan' | 'bell' | 'star' | 'shield' | 'share' | 'lock' | 'check' | 'paw';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

// Ícones de traço de 2 px com cantos arredondados (24 x 24), como no design.
const PATHS: Record<Exclude<IconName, 'paw'>, string> = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  card: 'M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3zM3 10h18M7 15h4',
  scan: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16',
  bell: 'M6 17v-6a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  star: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  share: 'M4 12v7h16v-7M12 3v12M8 7l4-4 4 4',
  lock: 'M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM8 11V8a4 4 0 0 1 8 0v3',
  check: 'M5 12.5l5 5 9-10',
};

export function Icon({ name, size = 22, color = colors.grape }: IconProps) {
  if (name === 'paw') {
    // Patinha: ícone preenchido.
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <Circle cx={5.5} cy={10.5} r={2.2} />
        <Circle cx={9.5} cy={5.8} r={2.2} />
        <Circle cx={14.5} cy={5.8} r={2.2} />
        <Circle cx={18.5} cy={10.5} r={2.2} />
        <Path d="M12 11c-3 0-6 3.2-6 6 0 1.8 1.4 2.5 3 2.5 1.2 0 2-.5 3-.5s1.8.5 3 .5c1.6 0 3-.7 3-2.5 0-2.8-3-6-6-6z" />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d={PATHS[name]} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
