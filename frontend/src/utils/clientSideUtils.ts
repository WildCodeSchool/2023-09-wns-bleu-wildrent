import { useGetProfileQuery } from '@/graphql/generated/schema';
import Cookies from 'js-cookie';

export function checkUserIsLoggedIn() {
  const { data } = useGetProfileQuery();
  return data?.getProfile?.role;
}
