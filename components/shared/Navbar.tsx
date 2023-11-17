'use client';

import { Box } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const linkItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-16 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {linkItems.map((link) => (
          <li
            className={classnames({
              'text-zinc-900': currentPath === link.href,
              'text-zinc-500': currentPath !== link.href,
              'hover:text-zinc-800 transition:colors': true,
            })}
            key={link.href}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout">Sign Out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
