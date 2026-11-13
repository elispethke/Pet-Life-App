import { Redirect } from 'expo-router';
import { useAuth, usePets } from '@/providers';

// Entrada do app ("/"): ÚNICO lugar que decide para onde ir.
//   sem sessão        -> /welcome
//   com sessão, sem pet -> /new-pet
//   com sessão e pet  -> /home
export default function Index() {
  const { status } = useAuth();
  const { pet } = usePets();

  if (status === 'loading') return null;
  if (status === 'signedOut') return <Redirect href="/welcome" />;
  return <Redirect href={pet ? '/home' : '/new-pet'} />;
}
