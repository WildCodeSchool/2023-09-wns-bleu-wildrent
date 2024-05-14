import Button from '@/ui/Button';
import Link from 'next/link';
import router from 'next/router';
import { navData } from '../const';
import { checkUserIsLoggedIn } from '@/utils/clientSideUtils';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import LogoutBtn from './LogoutBtn';
import { useGetProfileQuery } from '@/graphql/generated/schema';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState({ avatar: '', name: '' });
  function checkIsActive(link: string, router: any) {
    return link === router;
  }
  const { data } = useGetProfileQuery();
  const isLoggedIn = checkUserIsLoggedIn()?.success;
  const isAdmin = checkUserIsLoggedIn()?.isAdmin;
  useEffect(() => {
    if (isLoggedIn) {
      setUser({
        name: `${data?.getProfile.firstname} ${data?.getProfile.lastname}`,
        avatar: data?.getProfile.picture ? `${data?.getProfile.picture}` : '',
      });
    } else {
      return;
    }
  }, [isLoggedIn]);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Image src={logo} width={50} height={50} alt="logo" />
        <h1 className=" m-4 text-xl">WILDRENT</h1>
      </div>
      <div className="flex items-center">
        {navData.map((item, index) => (
          <Link href={item.link} key={index}>
            <div
              className={`m-1 p-4 rounded ${
                checkIsActive(item.link, router) ? 'text-secondary' : 'text-white'
              } hover:text-black`}
            >
              {item.text}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full" data-test-id="avatar">
                  <img
                    alt="profile-picture"
                    src={
                      user.avatar ||
                      'https://st3.depositphotos.com/3581215/18899/v/450/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg'
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="font-semibold text-center my-2">{user.name}</li>
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
          ) : (
            <div className="flex">
              <Link href={'/auth/login'}>
                <div className={'m-1 p-4 rounded'}>Se connecter</div>
              </Link>
              <Link href={'/auth/register'}>
                <div className={'m-1 p-4 rounded'}>S'enregistrer</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
