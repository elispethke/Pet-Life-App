import { useRouter } from 'expo-router';

// Ações da tela de digitalização. A câmera é SIMULADA: tirar a foto ou escolher da galeria
// leva direto à revisão, com uma leitura de exemplo.
export function useScanCard() {
  const router = useRouter();
  const goToReview = () => router.push('/review-scan');
  return { capture: goToReview, pickFromGallery: goToReview };
}
