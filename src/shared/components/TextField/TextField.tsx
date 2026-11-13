import { useState } from 'react';
import type { ComponentRef, Ref } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/shared/theme';
import { styles } from './TextField.styles';

// Tipo do ref do campo (para quem quiser focar o campo, por exemplo ao tocar em "próximo").
export type TextFieldRef = ComponentRef<typeof TextInput>;

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  testID: string;
  error?: string;
  // Realça o campo (leitura de baixa confiança, que o tutor precisa conferir).
  flagged?: boolean;
  // Campo de senha: esconde o texto e mostra o botão de olho para revelar.
  secure?: boolean;
  editable?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  inputRef?: Ref<TextFieldRef>;
};

const ICON_SIZE = 22;

function EyeIcon({ crossed }: { crossed: boolean }) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"
        stroke={colors.fieldLabel}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={colors.fieldLabel} strokeWidth={2} />
      {crossed && <Path d="M4 4l16 16" stroke={colors.fieldLabel} strokeWidth={2} strokeLinecap="round" />}
    </Svg>
  );
}

// Campo de texto do design: rótulo pequeno em maiúsculas DENTRO do campo, mensagem de erro abaixo.
export function TextField({
  label,
  value,
  onChangeText,
  testID,
  error,
  flagged = false,
  secure = false,
  editable = true,
  keyboardType,
  autoCapitalize,
  autoComplete,
  textContentType,
  returnKeyType,
  onSubmitEditing,
  inputRef,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const borderState = error
    ? styles.state.error
    : flagged
      ? styles.state.flagged
      : focused
        ? styles.state.focused
        : styles.state.idle;

  return (
    <View>
      <View style={[styles.box, borderState]}>
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            ref={inputRef}
            testID={testID}
            accessibilityLabel={label}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secure && !revealed}
            editable={editable}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            textContentType={textContentType}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCorrect={false}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </View>
        {secure && (
          <Pressable
            testID={`${testID}-toggle`}
            accessibilityRole="button"
            accessibilityLabel={revealed ? 'Ocultar senha' : 'Mostrar senha'}
            onPress={() => setRevealed((current) => !current)}
            style={styles.toggle}
          >
            <EyeIcon crossed={revealed} />
          </Pressable>
        )}
      </View>
      {error ? (
        <Text testID={`${testID}-error`} accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
