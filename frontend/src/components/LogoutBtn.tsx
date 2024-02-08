'use client';

import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/graphql/generated/schema';

export default function LogoutBtn() {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleClick = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <button onClick={handleClick} className="bg-red-600 p-4 text-xl font-bold" type="button">
      Logout
    </button>
  );
}
