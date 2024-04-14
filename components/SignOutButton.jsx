/**
 * Import necessary libraries
 */
import { deleteSessionCookie } from '@/lib/auth';

/**
 * SignOutButton function is a component that renders a sign out button.
 * When the button is clicked, the deleteSessionCookie function is called to delete the session cookie, effectively signing the user out.
 *
 * @function
 * @returns {JSX.Element} The rendered SignOutButton component
 */
export default function SignOutButton() {
    /**
     * Define the action to be performed when the form is submitted.
     * The deleteSessionCookie function is called to delete the session cookie.
     * @async
     * @function
     */
    async function action() {
        'use server';
        deleteSessionCookie();
    }

    /**
     * Render the SignOutButton component
     * The button's type is set to "submit", so when it is clicked, the form is submitted and the action function is called.
     */
    return (
        <form action={action}>
            <button type="submit"
                    className="text-blue-500 hover:underline">
                Sign out
            </button>
        </form>
    );
}