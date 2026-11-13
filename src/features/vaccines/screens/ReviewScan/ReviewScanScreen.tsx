import { Text, View } from 'react-native';
import { Button, Card, Chip, Screen, TextField } from '@/shared/components';
import { fieldIds } from '@/features/vaccines/utils';
import { styles } from './ReviewScanScreen.styles';
import { useReviewScan } from './useReviewScan';

// Revisar leitura: etapa OBRIGATÓRIA. Os campos lidos por IA ficam editáveis, os de baixa confiança
// aparecem destacados e nada é salvo enquanto houver data inválida.
export function ReviewScanScreen() {
  const { items, values, errors, summary, saving, setValue, save } = useReviewScan();

  const field = (id: string, label: string, flagged = false) => (
    <TextField
      testID={`review-${id}`}
      label={label}
      value={values[id] ?? ''}
      onChangeText={(text) => setValue(id, text)}
      error={errors[id] || undefined}
      flagged={flagged}
      autoCapitalize="none"
    />
  );

  return (
    <Screen keyboardAware withTabBar>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          Confira antes de salvar
        </Text>
        <Text style={styles.subtitle}>{summary}</Text>

        {items.map((item) =>
          item.layout === 'detailed' ? (
            <View key={item.id} style={styles.group}>
              {field(fieldIds.name(item.id), 'Vacina')}
              <View style={styles.row}>
                <View style={styles.rowItem}>{field(fieldIds.applied(item.id), 'Aplicada em')}</View>
                <View style={styles.rowItem}>{field(fieldIds.next(item.id), 'Próxima')}</View>
              </View>
            </View>
          ) : (
            <View key={item.id} style={styles.group}>
              {field(
                fieldIds.text(item.id),
                item.lowConfidence ? `${item.name} · baixa confiança` : item.name,
                item.lowConfidence,
              )}
              {item.lowConfidence ? (
                <View style={styles.flagRow}>
                  <Chip label="Revise a data" variant="warn" />
                  <Text style={styles.flagLink}>Toque para ver a foto</Text>
                </View>
              ) : null}
            </View>
          ),
        )}

        <Card>
          <Text style={styles.note}>Foto original guardada junto da carteira.</Text>
        </Card>
      </View>

      <View style={styles.footer}>
        <Button testID="review-save" label="Salvar na carteira" onPress={save} loading={saving} />
      </View>
    </Screen>
  );
}
