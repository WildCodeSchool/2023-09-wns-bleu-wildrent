'use client';

import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/graphql/generated/schema';
import Button from '@/ui/Button';

export default function LogoutBtn() {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleClick = async () => {
    await logout();
    router.push('/auth/login');
  };

  return <Button text="Logout" onClick={handleClick} style="text-white" />;
}
