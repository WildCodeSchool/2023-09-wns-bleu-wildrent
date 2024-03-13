import Profile from '@/components/Profile';
import { useProfileQuery } from '@/graphql/generated/schema';
import { User } from '@/types';

export default function Page() {
  const { data, error, loading } = useProfileQuery();
  console.log(data, loading, error);
  if (loading) {
    return <p>loading...</p>;
  } else if (!error && data) {
    return (
      <div>
        <h1>Profile Page</h1>
        <p>{`Hello ${data.getProfile.firstname}`}</p>
        <Profile user={data.getProfile as User} />
      </div>
    );
  }
}
