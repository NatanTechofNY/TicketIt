import { getUserFromSession } from '@/lib/auth';
import NavLink from './NavLink';
import SignOutButton from './SignOutButton';


export default async function NavBar() {

    const user = await getUserFromSession();

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
