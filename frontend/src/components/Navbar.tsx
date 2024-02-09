'use client';
import Button from '@/ui/Button';
import Link from 'next/link';
import router from 'next/router';
import { navData } from '../const';
import { checkUserLoggedIn } from '@/utils/clientSideUtils';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import LogoutBtn from './LogoutBtn';

export default function Navbar() {
  function checkIsActive(link: string, router: any) {
    return link === router;
  }
  const isLoggedIn = checkUserLoggedIn();

  return (
    <nav className="flex items-center justify-between bg-primary p-4">
      <div className="flex items-center">
        <Image src={logo} width={35} height={35} alt="logo" />
        <div className="text-white font-bold my-4">WildRent</div>
      </div>
      <div className="flex items-center">
        {navData.map((item, index) => (
          <Link href={item.link} key={index}>
            <div
              className={`m-1 p-4 rounded ${
                checkIsActive(item.link, router) ? 'text-secondary' : 'text-white'
              } hover:bg-light`}
            >
              {item.text}
            </div>
          </Link>
        ))}
      </div>
      <div>
        {isLoggedIn ? (
          <LogoutBtn />
        ) : (
          <Link href={'/auth/login'}>
            <div className={'m-1 p-4 rounded'}>Log in</div>
          </Link>
        )}
      </div>
    </nav>
  );
}
