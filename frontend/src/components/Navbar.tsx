import Link from 'next/link';
import router from 'next/router';
import { navData } from '../const';
import { checkUserIsLoggedIn } from '@/utils/clientSideUtils';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import UserBadge from './UserBadge';
import { useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { IoCart } from 'react-icons/io5';
import { CiMenuBurger } from 'react-icons/ci';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthModal } from './hooks/useAuthModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showLoginForm, showRegisterForm, handleLoginClick, handleRegisterClick, closeModal } =
    useAuthModal();

  function checkIsActive(link: string, router: unknown) {
    return link === router;
  }

  const isLoggedIn = checkUserIsLoggedIn()?.success;
  const isAdmin = checkUserIsLoggedIn()?.isAdmin || false;
  const logoPosition = 2;

  // Diviser le tableau de données de navigation
  const beforeLogo = navData.slice(0, logoPosition);
  const afterLogo = navData.slice(logoPosition);

  return (
    <>
      <nav className="flex items-center justify-between p-4 md:justify-evenly">
        <Link href={'/'} className="flex items-center md:order-2">
          <Image src={logo} priority={true} width={150} height={150} alt="logo Wildrent" />
        </Link>

        <div className="md:hidden order-2 flex-grow flex justify-end">
          <button className="text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <TfiClose /> : <CiMenuBurger />}
          </button>
        </div>

        <div className="hidden md:flex items-center justify-evenly w-full md:w-auto md:order-1">
          {beforeLogo.map((item, index) => (
            <Link href={item.link} key={index} style={{ color: 'primary' }}>
              <div
                className={`m-1 p-4 rounded ${
                  checkIsActive(item.link, router) ? 'text-secondary' : 'text-secondary'
                } hover:text-primary`}
              >
                {item.text}
              </div>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-evenly w-full md:w-auto md:order-3">
          {afterLogo.map((item, index) => (
            <Link href={item.link} key={index + logoPosition} style={{ color: 'primary' }}>
              <div
                className={`m-1 p-4 rounded ${
                  checkIsActive(item.link, router) ? 'text-secondary' : 'text-secondary'
                } hover:text-primary`}
              >
                {item.text}
              </div>
            </Link>
          ))}
          {isLoggedIn ? (
            <UserBadge isAdmin={isAdmin} />
          ) : (
            <button
              className="btn btn-secondary"
              onClick={handleLoginClick}
              data-test-id="nav-login-button"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-end space-y-4 p-4">
            {navData.map((item, index) => (
              <Link href={item.link} key={index} style={{ color: 'primary' }}>
                <div
                  className={`m-1 p-4 rounded ${
                    checkIsActive(item.link, router) ? 'text-secondary' : 'text-secondary'
                  } hover:text-primary`}
                >
                  {item.text}
                </div>
              </Link>
            ))}
            {isLoggedIn ? (
              <UserBadge isAdmin={isAdmin} />
            ) : (
              <button className="btn btn-secondary" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>
        </div>
      )}
      {showLoginForm && (
        <LoginForm closeModal={closeModal} switchToRegister={handleRegisterClick} />
      )}
      {showRegisterForm && <RegisterForm closeModal={closeModal} />}
    </>
  );
}
