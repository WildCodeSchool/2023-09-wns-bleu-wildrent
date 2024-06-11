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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

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
      <nav className="flex items-center justify-evenly p-4">
        <div className="flex items-center justify-evenly w-full md:w-auto">
          <div className="items-center flex-1 justify-start space-x-4 hidden md:flex">
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

          <div className="md:hidden">
            <button className="text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <TfiClose /> : <CiMenuBurger />}
            </button>
          </div>
        </div>
        <Link href={'/'} className="flex items-center justify-center">
          <Image src={logo} width={150} height={150} alt="logo Wildrent" />
        </Link>
        <div className="hidden md:flex items-center justify-evenly w-full md:w-auto">
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
          <div className="flex flex-col items-start space-y-4 p-4">
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
        <LoginForm
          closeModal={() => setShowLoginForm(false)}
          switchToRegister={handleRegisterClick}
        />
      )}
      {showRegisterForm && <RegisterForm closeModal={() => setShowRegisterForm(false)} />}
    </>
  );
}
