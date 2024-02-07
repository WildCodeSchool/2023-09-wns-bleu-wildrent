'use client';

import { useLogoutMutation } from '@/graphql/generated/schema';

export default function LogoutBtn() {
  const [logout, { data, loading, error }] = useLogoutMutation();

  const handleClick = async () => {
    await logout();
    console.log(data);
  };

  return (
    <button onClick={handleClick} className="bg-red-600 p-4 text-xl font-bold" type="button">
      Logout
    </button>
  );
}
