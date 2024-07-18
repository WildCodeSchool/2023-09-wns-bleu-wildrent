import Link from 'next/link';
import { JSX, SVGProps } from 'react';
import { navData } from '../const';

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container flex flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:gap-8 md:px-6 lg:gap-10">
        <div className="flex flex-col gap-2 text-sm items-center md:items-start md:gap-1 lg:flex-row lg:gap-2">
          <span className="mx-auto text-xs tracking-wide text-gray-500 lg:mx-0 lg:mr-2 dark:text-gray-400">
            Follow us
          </span>
          <div className="flex gap-2 lg:gap-1">
            <Link
              className="rounded-full w-6 h-6 overflow-hidden border border-gray-200 shadow-sm hover:shadow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:hover:shadow-steel dark:hover:scale-105 dark:focus-visible:ring-gray-300"
              href="#"
            >
              <FacebookIcon className="w-4 h-4 translate-x-0.5" />
            </Link>
            <Link
              className="rounded-full w-6 h-6 overflow-hidden border border-gray-200 shadow-sm hover:shadow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:hover:shadow-steel dark:hover:scale-105 dark:focus-visible:ring-gray-300"
              href="#"
            >
              <TwitterIcon className="w-4 h-4 translate-x-0.5" />
            </Link>
            <Link
              className="rounded-full w-6 h-6 overflow-hidden border border-gray-200 shadow-sm hover:shadow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:hover:shadow-steel dark:hover:scale-105 dark:focus-visible:ring-gray-300"
              href="#"
            >
              <InstagramIcon className="w-4 h-4 translate-x-0.5" />
            </Link>
          </div>
        </div>
        <nav className="flex flex-col gap-2 text-sm md:flex-row md:gap-4 lg:gap-2">
          {navData.map((item, index) => (
            <Link
              key={index}
              className="font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href={item.link}
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-200 w-full py-4 text-center dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Computer Rental Site. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
