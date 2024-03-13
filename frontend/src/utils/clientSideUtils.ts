import { useMeQuery } from '@/graphql/generated/schema';
import Cookies from 'js-cookie';

export function checkUserIsLoggedIn() {
  const { data } = useMeQuery();
  console.log('checkUserIsLoggedIn', data?.me?.role);
  return data?.me?.role;
}
