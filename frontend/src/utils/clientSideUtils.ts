import { useCheckIfLoggedInQuery } from '@/graphql/generated/schema';
import { Message } from '@/types';

export function checkUserIsLoggedIn(): Message | null {
  const { data, error, loading } = useCheckIfLoggedInQuery();
  if (loading) {
    return null;
  }
  if (!data && error) {
    throw new Error(`Cannot check if user is logged in: ${error.message}`);
  }
  return data?.checkIfLoggedIn as Message;
}
