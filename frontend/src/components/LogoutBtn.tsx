'use client';

import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/graphql/generated/schema';
import Button from '@/ui/Button';
import client from '@/graphql/client';

export default function LogoutBtn() {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleClick = async () => {
    try {
      const res = await logout();
      if (res.data?.logout.success) {
        await client.resetStore();
      }
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      router.push('/');
    }
  };

  return <Button text="Logout" onClick={handleClick} style="bg-secondary" />;
}
