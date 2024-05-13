import { useGetProfileQuery } from '@/graphql/generated/schema';

export function checkUserIsLoggedIn() {
  const { data } = useGetProfileQuery();
  return data?.getProfile?.role;
}
