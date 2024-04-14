/**
 * Import necessary components and libraries
 */
import { getUserFromSession } from '@/lib/auth';
import NavLink from './NavLink';
import SignOutButton from './SignOutButton';

/**
 * NavBar function is the main component of the navigation bar.
 * It fetches the user from the session and displays the appropriate UI based on the user's login status.
 * If the user is logged in, a SignOutButton is displayed.
 * If the user is not logged in, a NavLink to the login page is displayed.
 *
 * @async
 * @function
 * @returns {JSX.Element} The rendered NavBar component
 */
export default async function NavBar() {

    /**
     * Fetch the user from the session
     * @type {Object}
     */
    const user = await getUserFromSession();

    /**
     * Render the NavBar component
     * If the user is logged in, a SignOutButton is displayed.
     * If the user is not logged in, a NavLink to the login page is displayed.
     */
    return (
        <nav>
            <ul className="flex gap-2">
                <li className="font-bold font-roboto">
                    <NavLink href="/">
                        Home
                    </NavLink>
                </li>
                {user ? (
                    <li className={"ml-auto"}>
                        <SignOutButton />
                    </li>
                ) : (
                    <li className={"ml-auto"}>
                        <NavLink href="/login">
                            Login
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}