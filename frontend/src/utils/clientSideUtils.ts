'use client';
import Cookies from 'js-cookie';
export function checkUserLoggedIn() {
  const cookies = Cookies.get('token');
  console.log('cookies', cookies);
  return !!cookies;
}
