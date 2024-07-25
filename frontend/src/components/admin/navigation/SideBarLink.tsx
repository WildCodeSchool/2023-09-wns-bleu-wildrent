import { useRouter } from 'next/router';
import Link from 'next/link';
import { LinkProps } from '@/types/props';

export default function SideBarLink({ href, text, testId }: LinkProps) {
  const router = useRouter();
  // Cette fonction détermine si le lien est actif basé sur le chemin actuel
  const isActive = (pathname: string) => router.pathname === pathname;
  return (
    <Link
      data-test-id={testId}
      href={href}
      className={`${isActive(href) ? 'bg-secondary' : ''} flex items-center px-4 py-2 cursor-pointer rounded`}
    >
      {text}
    </Link>
  );
}
