import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/graphql/generated/schema';
import Button from '@/ui/Button';
import { useApolloClient } from '@apollo/client';

export default function LogoutBtn() {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const client = useApolloClient();
  const handleClick = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (err) {
      console.error(err);
      alert('Une erreur est survenue lors de la déconnexion.');
    } finally {
      client.clearStore();
    }
  };

  return <Button text="Se déconnecter" onClick={handleClick} style="text-white" />;
}
