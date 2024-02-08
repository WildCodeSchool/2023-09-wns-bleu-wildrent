'use client';
import Image from 'next/image';
import Button from '@/ui/Button';
import menuOpen from '../../public/menu-open.svg';
import Link from 'next/link';
import router from 'next/router';
import { navData } from '../const';

export default function Navbar() {
  function checkIsActive(link: string, router: any) {
    return link === router;
  }
  return (
    <nav className="flex items-center justify-between bg-primary p-4">
      <div className="flex items-center">
        <div className="text-white font-bold mr-4">Logo</div>
        <div className="text-white font-bold mr-4">Computer Rental Site</div>
      </div>
      <div className="flex items-center">
        {navData.map((item, index) => (
          <Link href={item.link}>
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
        <Button text="Sign in" />
      </div>
    </nav>
  );
}
