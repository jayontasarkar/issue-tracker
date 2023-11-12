import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const linkItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-16 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {linkItems.map((link) => (
          <li
            className="text-zinc-500 hover:text-zinc-800 transition:colors"
            key={link.href}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
