'use client';

/**
 * Import necessary libraries
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * NavLink function is a component that renders a navigation link.
 * It uses the usePathname hook to get the current pathname.
 * If the href prop matches the current pathname, a span element with the children is rendered.
 * Otherwise, a Link element with the href prop and the children is rendered.
 *
 * @function
 * @param {JSX.Element} children - The children to be rendered within the Link or span tag.
 * @param {string} href - The href for the Link element.
 * @param {boolean} prefetch - The prefetch prop for the Link element.
 * @returns {JSX.Element} The rendered NavLink component
 */
export default function NavLink({ children, href, prefetch }) {
  /**
   * Use the usePathname hook to get the current pathname
   * @type {string}
   */
  const pathname = usePathname();

  /**
   * If the href prop matches the current pathname, render a span element with the children
   */
  if (href === pathname) {
    return (
        <span className="text-blue-500">
        {children}
      </span>
    );
  }

  /**
   * Otherwise, render a Link element with the href prop and the children
   */
  return (
      <Link href={href} prefetch={prefetch}
            className="text-blue-500 hover:underline">
        {children}
      </Link>
  );
}