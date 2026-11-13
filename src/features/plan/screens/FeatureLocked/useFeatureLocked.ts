import { useLocalSearchParams, useRouter } from 'expo-router';
import { LOCKED_FEATURE_TEXT, isFeatureKey } from './lockedFeatures';

// Texto e ações da folha "Recurso do plano anual". O texto muda conforme o recurso tocado.
export function useFeatureLocked() {
  const router = useRouter();
  const { feature } = useLocalSearchParams<{ feature?: string }>();
  const text = LOCKED_FEATURE_TEXT[isFeatureKey(feature) ? feature : 'scan'];

  return {
    text,
    seePlan: () => router.dismissTo('/plan'),
    dismiss: () => router.back(),
  };
}
