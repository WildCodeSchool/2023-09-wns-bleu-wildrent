import { useGetProfileQuery } from '@/graphql/generated/schema';
import Link from 'next/link';
import LogoutBtn from './LogoutBtn';

export default function UserBadge({ isAdmin }: { isAdmin: boolean }) {
  const { data } = useGetProfileQuery();
  const avatar = data?.getProfile.picture;
  const name = data?.getProfile.firstname;
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full" data-test-id="avatar">
          <img
            alt="profile-picture"
            src={
              avatar ||
              'https://st3.depositphotos.com/3581215/18899/v/450/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg'
            }
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className="font-semibold text-center my-2">{`Hello ${name}` || 'no name'}</li>
        {isAdmin && (
          <li>
            <Link href={'/admin'}>
              <div className="justify-between" data-test-id="dashboard-id">
                Dashboard
              </div>
            </Link>
          </li>
        )}
        <li>
          <Link href={'/myprofile'}>
            <div className="justify-between">Mon compte</div>
          </Link>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li data-test-id="logout-btn">
          <LogoutBtn />
        </li>
      </ul>
    </div>
  );
}
