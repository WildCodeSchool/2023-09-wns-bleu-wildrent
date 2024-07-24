import Link from 'next/link';
import router from 'next/router';
import { navData } from '../const';
import { checkUserIsLoggedIn } from '@/utils/clientSideUtils';
import logo from '../../public/logo.svg';
import Image from 'next/image';
import UserBadge from './UserBadge';
import { useEffect, useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { CiMenuBurger } from 'react-icons/ci';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuthModal } from './hooks/useAuthModal';
import { IoCart } from 'react-icons/io5';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const { showLoginForm, showRegisterForm, handleLoginClick, handleRegisterClick, closeModal } =
    useAuthModal();

  useEffect(() => {
    if (localStorage.getItem('cartList')) {
      setIsCartEmpty(false);
    }
  }, []);

  function checkIsActive(link: string, router: unknown) {
    return link === router;
  }

  const isLoggedIn = checkUserIsLoggedIn()?.success;
  const isAdmin = checkUserIsLoggedIn()?.isAdmin || false;
  const logoPosition = 2;

  const beforeLogo = navData.slice(0, logoPosition);
  const afterLogo = navData.slice(logoPosition);

  return (
    <>
      <nav className="flex items-center p-4 md:justify-evenly justify-center">
        <Link href={'/'} className="flex items-center md:order-2">
          <Image src={logo} priority={true} width={150} height={150} alt="logo Wildrent" />
        </Link>

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
                {item.text === <IoCart size={25} /> ? (
                  <IoCart size={25} className={isCartEmpty ? '' : 'text-red-500'} />
                ) : (
                  item.text
                )}
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
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center space-y-4 p-4">
          {navData.map((item, index) => (
            <Link href={item.link} key={index} style={{ color: 'primary' }}>
              <div
                className={`m-1 p-4 rounded ${
                  checkIsActive(item.link, router) ? 'text-secondary' : 'text-secondary'
                } hover:text-primary`}
              >
                {item.text === <IoCart size={25} /> ? (
                  <IoCart size={25} className={isCartEmpty ? '' : 'text-red-500'} />
                ) : (
                  item.text
                )}
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
      )}
      {showLoginForm && (
        <LoginForm closeModal={closeModal} switchToRegister={handleRegisterClick} />
      )}
      <div className=" order-2 flex-grow flex justify-end relative md:hidden">
        <button
          className="text-3xl fixed bottom-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <TfiClose /> : <CiMenuBurger />}
        </button>
      </div>
      {showRegisterForm && <RegisterForm closeModal={closeModal} />}
    </>
  );
}
