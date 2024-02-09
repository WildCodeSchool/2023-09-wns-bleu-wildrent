'use client';
import Cookies from 'js-cookie';
export function checkUserLoggedIn() {
  const cookies = Cookies.get('ajs_anonymous_id');
  return !!cookies;
}
